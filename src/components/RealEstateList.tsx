"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

// نوع داده‌ای برای لیست املاک
interface Listing {
  id: number;
  title: string;
  price: number;
}

const RealEstateList = () => {
  const [currency, setCurrency] = useState<"TOMAN" | "USD" | "EUR" | "AED" | "TRY">("TOMAN");
  const [rates, setRates] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { locale } = useTranslations(); // زبان سایت را می‌گیریم

  const listings: Listing[] = [
    { id: 1, title: "آپارتمان در تهران", price: 5000000000 },
    { id: 2, title: "ویلای شمال", price: 12000000000 },
    { id: 3, title: "خانه در اصفهان", price: 3500000000 },
  ];

  const API_KEY = "0ae6c1ffb4373ecff36775ad4cb038d0"; // کلید API برای دریافت نرخ ارز

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://api.currencylayer.com/live", {
          params: {
            access_key: API_KEY,
            symbols: "EUR,AED,TRY,IRR",
          },
        });

        if (res.data.success) {
          setRates(res.data.quotes);
          setError(null);
        } else {
          setError("خطا در دریافت نرخ ارز");
        }
      } catch (err: any) {
        setError("مشکل در اتصال به سرور");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  // انتخاب ارز براساس زبان
  useEffect(() => {
    switch (locale) {
      case "en":
        setCurrency("USD");
        break;
      case "ar":
        setCurrency("AED");
        break;
      case "tr":
        setCurrency("TRY");
        break;
      default:
        setCurrency("TOMAN");
    }
  }, [locale]);

  // تبدیل قیمت به ارزهای مختلف
  const convertPrice = (price: number) => {
    if (currency === "TOMAN") {
      return price.toLocaleString("fa-IR") + " تومان";
    }

    if (!rates || !rates["USDIRR"]) return "نرخ ارز در دسترس نیست";

    const rial = price * 10; // چون قیمت‌ها به تومان هستند
    const usd = rial / rates["USDIRR"]; // تبدیل تومان به دلار

    switch (currency) {
      case "USD":
        return usd.toLocaleString("en-US", { style: "currency", currency: "USD" });
      case "EUR":
        return (usd * rates["USDEUR"]).toLocaleString("en-US", { style: "currency", currency: "EUR" });
      case "AED":
        return (usd * rates["USDAED"]).toLocaleString("en-US", { style: "currency", currency: "AED" });
      case "TRY":
        return (usd * rates["USDTRY"]).toLocaleString("en-US", { style: "currency", currency: "TRY" });
      default:
        return "ارز ناشناخته";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">لیست املاک</h2>

      <label className="block mb-2">نمایش قیمت بر اساس:</label>
      <select
        className="border rounded p-2 mb-4"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as any)}
        disabled={loading}
      >
        <option value="TOMAN">تومان</option>
        <option value="USD">دلار</option>
        <option value="EUR">یورو</option>
        <option value="AED">درهم</option>
        <option value="TRY">لیر</option>
      </select>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500 mb-4">در حال دریافت نرخ ارز...</p>}

      <ul className="space-y-4">
        {listings.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow">
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p>قیمت: {convertPrice(item.price)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealEstateList;
