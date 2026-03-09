'use client';

import { useState } from 'react';
import { Form, Input, Button, Tabs, Alert } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type AuthTab = 'signin' | 'register';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (values: { email: string; password: string }) => {
    setLoading(true);
    setAuthError(null);

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setAuthError('Invalid email or password. Please try again.');
      return;
    }

    router.push('/');
    router.refresh();
  };

  const handleRegister = async (values: { email: string; password: string }) => {
    setLoading(true);
    setAuthError(null);
    setSuccessMsg(null);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setAuthError(data.error);
      return;
    }

    setSuccessMsg('Account created! You can now sign in.');
    setActiveTab('signin');
  };

  const tabItems = [
    {
      key: 'signin',
      label: 'Sign In',
      children: (
        <Form
          layout="vertical"
          onFinish={handleSignIn}
          requiredMark={false}
          className="mt-4"
        >
          <Form.Item
            name="email"
            label={<span className="font-semibold text-gray-700">Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="font-semibold text-gray-700">Password</span>}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password size="large" placeholder="Your password" autoComplete="current-password" />
          </Form.Item>
          <Form.Item className="mb-0 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full h-12 text-base font-semibold"
              style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'register',
      label: 'Register',
      children: (
        <Form
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          className="mt-4"
        >
          <Form.Item
            name="email"
            label={<span className="font-semibold text-gray-700">Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className="font-semibold text-gray-700">Password</span>}
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password size="large" placeholder="Create a password" autoComplete="new-password" />
          </Form.Item>
          <Form.Item className="mb-0 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full h-12 text-base font-semibold"
              style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', border: 'none' }}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}
          >
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Spending Manager</h1>
          <p className="text-gray-500 mt-2">Sign in to track your finances</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {authError && (
            <Alert
              message={authError}
              type="error"
              showIcon
              closable
              onClose={() => setAuthError(null)}
              className="mb-6"
            />
          )}
          {successMsg && (
            <Alert
              message={successMsg}
              type="success"
              showIcon
              closable
              onClose={() => setSuccessMsg(null)}
              className="mb-6"
            />
          )}

          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key as AuthTab);
              setAuthError(null);
              setSuccessMsg(null);
            }}
            items={tabItems}
            centered
          />
        </div>
      </div>
    </div>
  );
}
