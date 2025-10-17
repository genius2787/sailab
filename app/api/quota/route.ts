import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUserQuota, incrementUserQuota, initQuotaTable } from '@/lib/db';

// Quota limits based on tier
const QUOTA_LIMITS = {
  'Starter': 3,
  'Professional': 10,
  'Enterprise': 30
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userTier = (session.user as any).tier || 'Starter';
    
    // Initialize database table if needed
    await initQuotaTable();
    
    // Get user quota from database
    const userQuota = await getUserQuota(userId, userTier);
    
    const limit = QUOTA_LIMITS[userTier as keyof typeof QUOTA_LIMITS] || 3;
    const remaining = Math.max(0, limit - userQuota.used_today);
    
    return NextResponse.json({
      usedToday: userQuota.used_today,
      limit,
      remaining,
      tier: userTier,
      resetDate: userQuota.last_reset
    });
    
  } catch (error) {
    console.error('[Quota API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to get quota information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userTier = (session.user as any).tier || 'Starter';
    
    // Initialize database table if needed
    await initQuotaTable();
    
    // Get current quota
    const userQuota = await getUserQuota(userId, userTier);
    const limit = QUOTA_LIMITS[userTier as keyof typeof QUOTA_LIMITS] || 3;
    
    // Check if user has remaining quota
    if (userQuota.used_today >= limit) {
      return NextResponse.json({
        success: false,
        error: 'Daily quota exceeded',
        usedToday: userQuota.used_today,
        limit,
        remaining: 0,
        tier: userTier
      }, { status: 429 });
    }
    
    // Increment usage in database
    const newUsedToday = await incrementUserQuota(userId, userTier);
    const remaining = Math.max(0, limit - newUsedToday);
    
    return NextResponse.json({
      success: true,
      usedToday: newUsedToday,
      limit,
      remaining,
      tier: userTier
    });
    
  } catch (error) {
    console.error('[Quota API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update quota' },
      { status: 500 }
    );
  }
}
