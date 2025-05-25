import dotenv from 'dotenv';
import { z } from 'zod';
import { AppConfig } from './types';

// Load environment variables
dotenv.config();

// Schema for validating environment variables
const envSchema = z.object({
  // Twitter API
  TWITTER_API_KEY: z.string(),
  TWITTER_API_SECRET: z.string(),
  TWITTER_ACCESS_TOKEN: z.string(),
  TWITTER_ACCESS_SECRET: z.string(),
  TWITTER_BEARER_TOKEN: z.string(),

  // Agent configuration
  AGENT_NAME: z.string(),
  AGENT_DESCRIPTION: z.string(),
  AGENT_PERSONA: z.string(),
  
  // LLM configuration
  LLM_API_KEY: z.string(),
  LLM_MODEL: z.string(),
  
  // Application settings
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  TWEET_INTERVAL_MIN: z.coerce.number().positive().default(60),
  REPLY_INTERVAL_MIN: z.coerce.number().positive().default(15),
  LIKE_RATIO: z.coerce.number().min(0).max(1).default(0.3),
  RETWEET_RATIO: z.coerce.number().min(0).max(1).default(0.2),
  MAX_DAILY_TWEETS: z.coerce.number().positive().default(10)
});

/**
 * Load and validate application configuration from environment variables
 * @returns Validated configuration object
 */
export function loadConfig(): AppConfig {
  const env = envSchema.parse(process.env);
  
  return {
    twitter: {
      apiKey: env.TWITTER_API_KEY,
      apiSecret: env.TWITTER_API_SECRET,
      accessToken: env.TWITTER_ACCESS_TOKEN,
      accessSecret: env.TWITTER_ACCESS_SECRET,
      bearerToken: env.TWITTER_BEARER_TOKEN
    },
    agent: {
      name: env.AGENT_NAME,
      description: env.AGENT_DESCRIPTION,
      persona: env.AGENT_PERSONA,
      tweetIntervalMin: env.TWEET_INTERVAL_MIN,
      replyIntervalMin: env.REPLY_INTERVAL_MIN,
      likeRatio: env.LIKE_RATIO,
      retweetRatio: env.RETWEET_RATIO,
      maxDailyTweets: env.MAX_DAILY_TWEETS
    },
    llm: {
      apiKey: env.LLM_API_KEY,
      model: env.LLM_MODEL
    },
    logLevel: env.LOG_LEVEL
  };
}

// Export a singleton instance of the configuration
export const config = loadConfig();