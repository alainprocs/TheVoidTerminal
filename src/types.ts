import { TwitterApi } from 'twitter-api-v2';
import { Content, UUID } from '@elizaos/core';

export interface TwitterConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
  bearerToken: string;
}

export interface AgentConfig {
  name: string;
  description: string;
  persona: string;
  tweetIntervalMin: number;
  replyIntervalMin: number;
  likeRatio: number;
  retweetRatio: number;
  maxDailyTweets: number;
}

export interface LLMConfig {
  apiKey: string;
  model: string;
}

export interface AppConfig {
  twitter: TwitterConfig;
  agent: AgentConfig;
  llm: LLMConfig;
  logLevel: string;
}

export interface TwitterClient {
  client: TwitterApi;
  tweet: (content: string) => Promise<string>;
  reply: (content: string, tweetId: string) => Promise<string>;
  like: (tweetId: string) => Promise<boolean>;
  retweet: (tweetId: string) => Promise<boolean>;
  search: (query: string, count?: number) => Promise<Tweet[]>;
  getTweet: (tweetId: string) => Promise<Tweet | null>;
  getTimeline: (count?: number) => Promise<Tweet[]>;
  getMentions: (count?: number) => Promise<Tweet[]>;
}

export interface Tweet {
  id: string;
  text: string;
  authorId: string;
  authorUsername: string;
  authorName: string;
  createdAt: Date;
  inReplyToId?: string;
  inReplyToUserId?: string;
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  conversationId?: string;
}

export interface TweetAction {
  type: 'tweet' | 'reply' | 'like' | 'retweet';
  content?: string;
  tweetId?: string;
  timestamp: Date;
}

export interface AgentMemory {
  id: UUID;
  tweets: Map<string, Tweet>;
  actions: TweetAction[];
  lastActionTime: Date | null;
  recentTopics: string[];
}

export interface ActionDecision {
  shouldTweet: boolean;
  shouldReply: boolean;
  shouldLike: boolean;
  shouldRetweet: boolean;
  content?: Content;
  targetTweetId?: string;
}