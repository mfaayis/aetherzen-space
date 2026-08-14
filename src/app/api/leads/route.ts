import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { name, email, location } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Extract geolocation headers from Vercel
    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const vCity = req.headers.get("x-vercel-ip-city");
    const city = location ? location.trim() : (vCity || "Unknown");
    const region = req.headers.get("x-vercel-ip-country-region") || "Unknown";

    const { error } = await supabase
      .from("leads")
      .insert([{ 
        name: name.trim(), 
        email: email.trim().toLowerCase(), 
        country,
        city,
        region,
        created_at: new Date().toISOString() 
      }]);

    if (error) {
      // Duplicate email: friendly message
      if (error.code === "23505") {
        return NextResponse.json({ message: "already_registered" }, { status: 200 });
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err) {
    console.error("Leads API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

