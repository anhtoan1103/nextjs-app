import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/transactions
 * Fetch transactions with optional filters
 * Query params: startDate, endDate, type
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;

    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    let query = supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });

    // Apply date range filter
    if (startDate && endDate) {
      query = query.gte('date', startDate).lte('date', endDate);
    }

    // Apply type filter
    if (type && (type === 'income' || type === 'expense')) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json(
        { error: error.message, statusCode: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      statusCode: 200,
      message: 'Transactions fetched successfully',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', statusCode: 500 },
      { status: 500 }
    );
  }
}

/**
 * POST /api/transactions
 * Create a new transaction
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    // Validate required fields
    const { type, description, amount, date, category } = body;

    if (!type || !description || !amount || !date || !category) {
      return NextResponse.json(
        { error: 'Missing required fields', statusCode: 400 },
        { status: 400 }
      );
    }

    // Validate type
    if (type !== 'income' && type !== 'expense') {
      return NextResponse.json(
        { error: 'Invalid transaction type', statusCode: 400 },
        { status: 400 }
      );
    }

    // Validate amount
    if (isNaN(amount) || Number(amount) <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number', statusCode: 400 },
        { status: 400 }
      );
    }

    // Insert transaction
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          type,
          description,
          amount: Number(amount),
          date,
          category,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating transaction:', error);
      return NextResponse.json(
        { error: error.message, statusCode: 500 },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      statusCode: 201,
      message: 'Transaction created successfully',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error', statusCode: 500 },
      { status: 500 }
    );
  }
}
