import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    // Simple basic auth or passcode check
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSCODE || "K101sh@2"}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }

    return NextResponse.json({ leads: data }, { status: 200 });
  } catch (err) {
    console.error("Admin Leads API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
