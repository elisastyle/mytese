// src/components/ClientSideLog.tsx
'use client'; // باعث می‌شود که این کامپوننت فقط در کلاینت اجرا شود

import { useEffect } from 'react';

export default function ClientSideLog() {
  useEffect(() => {
    console.log('✅ این لاگ در مرورگر دیده می‌شود');
  }, []); // این کد فقط یک بار اجرا می‌شود

  return null; // هیچ چیزی به UI اضافه نمی‌کند
}
