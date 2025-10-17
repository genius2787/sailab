import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
// import { getUserQuota, incrementUserQuota, initQuotaTable } from '@/lib/db';

// Quota limits based on tier
const QUOTA_LIMITS = {
  'Starter': 3,
  'Professional': 10,
  'Enterprise': 30
};

// Temporary in-memory store for quota tracking (fallback)
const quotaStore = new Map<string, {
  usedToday: number;
  lastReset: string;
  tier: string;
}>();

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const userTier = (session.user as any).tier || 'Starter';
    const today = new Date().toDateString();
    
    // Get or initialize user quota
    let userQuota = quotaStore.get(userId);
    
    if (!userQuota || userQuota.lastReset !== today) {
      // Reset quota for new day
      userQuota = {
        usedToday: 0,
        lastReset: today,
        tier: userTier
      };
      quotaStore.set(userId, userQuota);
    }
    
    const limit = QUOTA_LIMITS[userTier as keyof typeof QUOTA_LIMITS] || 3;
    const remaining = Math.max(0, limit - userQuota.usedToday);
    
    return NextResponse.json({
      usedToday: userQuota.usedToday,
      limit,
      remaining,
      tier: userTier,
      resetDate: today
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
    const today = new Date().toDateString();
    
    // Get or initialize user quota
    let userQuota = quotaStore.get(userId);
    
    if (!userQuota || userQuota.lastReset !== today) {
      userQuota = {
        usedToday: 0,
        lastReset: today,
        tier: userTier
      };
    }
    
    const limit = QUOTA_LIMITS[userTier as keyof typeof QUOTA_LIMITS] || 3;
    
    // Check if user has remaining quota
    if (userQuota.usedToday >= limit) {
      return NextResponse.json({
        success: false,
        error: 'Daily quota exceeded',
        usedToday: userQuota.usedToday,
        limit,
        remaining: 0,
        tier: userTier
      }, { status: 429 });
    }
    
    // Increment usage
    userQuota.usedToday += 1;
    quotaStore.set(userId, userQuota);
    
    const remaining = Math.max(0, limit - userQuota.usedToday);
    
    return NextResponse.json({
      success: true,
      usedToday: userQuota.usedToday,
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
