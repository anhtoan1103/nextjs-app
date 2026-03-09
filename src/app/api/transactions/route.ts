import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';

/**
 * GET /api/transactions
 * Fetch transactions with optional filters
 * Query params: startDate, endDate, type
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized', statusCode: 401 }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    let data;

    if (startDate && endDate && type && (type === 'income' || type === 'expense')) {
      data = await sql`
        SELECT * FROM transactions
        WHERE user_id = ${session.user.id}
          AND date >= ${startDate} AND date <= ${endDate}
          AND type = ${type}
        ORDER BY date DESC
      `;
    } else if (startDate && endDate) {
      data = await sql`
        SELECT * FROM transactions
        WHERE user_id = ${session.user.id}
          AND date >= ${startDate} AND date <= ${endDate}
        ORDER BY date DESC
      `;
    } else if (type && (type === 'income' || type === 'expense')) {
      data = await sql`
        SELECT * FROM transactions
        WHERE user_id = ${session.user.id} AND type = ${type}
        ORDER BY date DESC
      `;
    } else {
      data = await sql`
        SELECT * FROM transactions
        WHERE user_id = ${session.user.id}
        ORDER BY date DESC
      `;
    }

    return NextResponse.json({ data, statusCode: 200, message: 'Transactions fetched successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', statusCode: 500 }, { status: 500 });
  }
}

/**
 * POST /api/transactions
 * Create a new transaction
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized', statusCode: 401 }, { status: 401 });
    }

    const body = await request.json();
    const { type, description, amount, date, category } = body;

    if (!type || !description || !amount || !date || !category) {
      return NextResponse.json({ error: 'Missing required fields', statusCode: 400 }, { status: 400 });
    }

    if (type !== 'income' && type !== 'expense') {
      return NextResponse.json({ error: 'Invalid transaction type', statusCode: 400 }, { status: 400 });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number', statusCode: 400 }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO transactions (user_id, type, description, amount, date, category)
      VALUES (${session.user.id}, ${type}, ${description}, ${Number(amount)}, ${date}, ${category})
      RETURNING *
    `;

    return NextResponse.json({ data: rows[0], statusCode: 201, message: 'Transaction created successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error', statusCode: 500 }, { status: 500 });
  }
}
