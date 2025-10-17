import { sql } from '@vercel/postgres';

// Initialize database table for quota tracking
export async function initQuotaTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_quotas (
        user_id VARCHAR(255) PRIMARY KEY,
        used_today INTEGER DEFAULT 0,
        last_reset DATE DEFAULT CURRENT_DATE,
        tier VARCHAR(50) DEFAULT 'Starter',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('[DB] Quota table initialized successfully');
  } catch (error) {
    console.error('[DB] Error initializing quota table:', error);
    throw error;
  }
}

// Get user quota information
export async function getUserQuota(userId: string, tier: string = 'Starter') {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get or create user quota record
    let result = await sql`
      SELECT * FROM user_quotas 
      WHERE user_id = ${userId}
    `;
    
    if (result.rows.length === 0) {
      // Create new user quota record
      await sql`
        INSERT INTO user_quotas (user_id, used_today, last_reset, tier)
        VALUES (${userId}, 0, ${today}, ${tier})
      `;
      
      result = await sql`
        SELECT * FROM user_quotas 
        WHERE user_id = ${userId}
      `;
    } else {
      // Check if we need to reset for new day
      const lastReset = result.rows[0].last_reset;
      if (lastReset !== today) {
        await sql`
          UPDATE user_quotas 
          SET used_today = 0, last_reset = ${today}, tier = ${tier}
          WHERE user_id = ${userId}
        `;
        
        result = await sql`
          SELECT * FROM user_quotas 
          WHERE user_id = ${userId}
        `;
      }
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('[DB] Error getting user quota:', error);
    throw error;
  }
}

// Increment user quota usage
export async function incrementUserQuota(userId: string, tier: string = 'Starter') {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // First ensure user record exists
    await getUserQuota(userId, tier);
    
    // Increment usage
    const result = await sql`
      UPDATE user_quotas 
      SET used_today = used_today + 1, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId} AND last_reset = ${today}
      RETURNING used_today
    `;
    
    return result.rows[0]?.used_today || 0;
  } catch (error) {
    console.error('[DB] Error incrementing user quota:', error);
    throw error;
  }
}
