"use client";

import { notFound } from "next/navigation";
import { useState } from "react";
import { GL } from "@/components/gl";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Eye, MessageCircle, Heart, Facebook, Twitter, Linkedin, Link2, Bot } from "lucide-react";
import { BlogMediaGallery } from "@/components/blog-media";

// Media interface for blog posts
interface BlogMedia {
  type: 'image' | 'video' | 'youtube';
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  thumbnail?: string; // For videos
}

// Extended blog post interface
interface ExtendedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
  image?: string;
  media?: BlogMedia[]; // Media gallery
  views: number;
  comments: number;
  likes: number;
}

// Extended blog data with full content
const extendedBlogPosts: ExtendedBlogPost[] = [
  {
    id: "1",
    slug: "future-ai-quantitative-finance",
    title: "The Future of AI in Quantitative Finance",
    excerpt: "Exploring how artificial intelligence is revolutionizing quantitative trading strategies and risk management in modern financial markets.",
    content: `
      <h2>Revolutionary AI Solutions for Quantitative Finance</h2>
      <p><em>Date: August 15, 2025<br/>Location: Tokyo, Japan</em></p>

      <p>We are thrilled to announce that Sail Laboratory Co., Ltd. has officially opened its doors! From our headquarters in the heart of Tokyo (5F, Dia Gate Ikebukuro, 1-16-15 Minamiikebukuro, Toshima-ku, Tokyo 171-0022, Japan), we embark on a mission to revolutionize AI-powered asset management — combining cutting-edge Large Language Model (LLM) Agents, advanced reinforcement learning, and data-driven investment strategies to deliver smarter, faster, and more reliable financial decisions.</p>

      <p>Our team blends world-class AI research with real-world market expertise, offering:</p>

      <ul>
        <li>Long-term value investment strategies</li>
        <li>Dynamic swing trading powered by next-generation AI</li>
        <li>Custom AI-driven analytics solutions</li>
      </ul>

      <p>With an initial ¥50 million in assets under management, we are committed to creating sustainable value for our clients and partners while pushing the boundaries of what AI can achieve in finance.</p>
    `,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        alt: 'AI Trading Dashboard',
        caption: 'Our AI-powered trading dashboard showing real-time market analysis'
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        alt: 'SAIL Lab Introduction Video',
        caption: 'Introduction to SAIL Laboratory\'s AI trading technology'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
        alt: 'Tokyo Office',
        caption: 'SAIL Lab headquarters in Tokyo\'s Ikebukuro district'
      }
    ],
    category: "AI & Finance",
    readTime: "5 min read",
    date: "2024-10-01",
    author: "Joe Wang",
    featured: true,
    views: 14,
    comments: 0,
    likes: 1
  },
  {
    id: "2",
    slug: "neural-network-trading-algorithms",
    title: "Building Robust Trading Algorithms with Neural Networks",
    excerpt: "A deep dive into implementing neural network architectures for high-frequency trading and market prediction systems.",
    content: `
      <h2>Auto-Bidding Agent @ KDD25, Canada!</h2>
      <p>We are excited to present our latest research on automated bidding systems using advanced neural networks and reinforcement learning techniques.</p>

      <p>Our approach combines:</p>
      <ul>
        <li>Deep learning price prediction models</li>
        <li>Adaptive strategy optimization algorithms</li>
        <li>Real-time risk management systems</li>
        <li>Multi-asset class support infrastructure</li>
      </ul>

      <p>The results demonstrate significant improvements in trading performance across various market conditions.</p>
    `,
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        alt: 'Neural Network Visualization',
        caption: 'Deep learning architecture for price prediction'
      },
      {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop',
        alt: 'Trading Algorithm Demo',
        caption: 'Live demonstration of our neural network trading algorithm'
      }
    ],
    category: "Machine Learning",
    readTime: "8 min read",
    date: "2024-09-28",
    author: "Evy Yang",
    views: 2,
    comments: 0,
    likes: 0
  },
  {
    id: "3",
    slug: "regulatory-compliance-ai-trading",
    title: "Regulatory Compliance in AI Trading Systems",
    excerpt: "Understanding the legal landscape and compliance requirements for deploying AI-powered trading solutions in regulated markets.",
    content: `
      <h2>We Got Best Paper Award! (Waseda U.'s Work)</h2>
      <p>Our research on regulatory compliance frameworks for AI trading systems has been recognized with the best paper award at the 13th International Conference on Pattern Recognition Applications and Methods (ICPRAM).</p>

      <p>This work addresses critical challenges in:</p>
      <ul>
        <li>Automated compliance monitoring</li>
        <li>Risk assessment protocols</li>
        <li>Regulatory reporting automation</li>
      </ul>
    `,
    category: "Compliance",
    readTime: "6 min read",
    date: "2024-09-25",
    author: "Jayne Yu",
    views: 8,
    comments: 0,
    likes: 0
  }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [hovering, setHovering] = useState(false);
  const [likes, setLikes] = useState(0);

  // Find the blog post by slug
  const post = extendedBlogPosts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Set initial likes from post data
  useState(() => {
    setLikes(post.likes);
  });

  // Get recent posts (other posts)
  const recentPosts = extendedBlogPosts.filter(p => p.slug !== params.slug).slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10 container mx-auto py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src={`/${post.author.split(' ')[0]}.jpg`}
                alt={post.author}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-mono text-foreground/70">{post.author}</span>
              <span className="font-mono text-foreground/50">•</span>
              <span className="font-mono text-foreground/50">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <span className="font-mono text-foreground/50">•</span>
              <span className="font-mono text-foreground/50">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-sentient mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-sentient text-primary text-lg">LLM-Agentic Trader Joe</div>
                <div className="font-mono text-sm text-foreground/60">AI-Powered Multi-LLM Agents Stock Analysis</div>
              </div>
            </div>

            <p className="text-lg font-mono text-foreground/80 mb-8">
              Smarter Investing. Powered by AI.
            </p>
          </div>

          {/* Social Share */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')} className="hover:text-blue-600">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')} className="hover:text-sky-500">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')} className="hover:text-blue-700">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare('copy')} className="hover:text-green-600">
              <Link2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-12 text-sm font-mono text-foreground/60">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments} comments</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLike} className="text-sm font-mono flex items-center gap-2 hover:text-red-500">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </Button>
          </div>

          {/* Article Content */}
          <Card className="bg-card/60 backdrop-blur-sm border-border/40 mb-16">
            <CardContent className="prose prose-invert max-w-none p-8">
              <div
                className="font-mono leading-relaxed text-foreground/90"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Media Gallery */}
              {post.media && post.media.length > 0 && (
                <BlogMediaGallery media={post.media} />
              )}
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-sentient">Recent Posts</h2>
              <Link href="/blog">
                <Button variant="outline" size="sm">See All</Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((recentPost) => (
                <Link key={recentPost.id} href={`/blog/${recentPost.slug}`}>
                  <Card className="bg-card/60 backdrop-blur-sm border-border/40 hover:bg-card/80 hover-lift transition-all duration-300 cursor-pointer group h-full">
                    <CardHeader className="pb-4">
                      {recentPost.image && (
                        <div className="aspect-video bg-muted rounded mb-4 overflow-hidden">
                          <img src={recentPost.image} alt={recentPost.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <Badge variant="outline" className="w-fit mb-2">
                        {recentPost.category}
                      </Badge>
                      <h3 className="font-sentient group-hover:text-primary transition-colors line-clamp-2">
                        {recentPost.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{recentPost.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{recentPost.comments}</span>
                          </div>
                        </div>
                        <Heart className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}