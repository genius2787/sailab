"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
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
  hidden?: boolean; // Add hidden property
}

// Extended blog data with full content
const extendedBlogPosts: ExtendedBlogPost[] = [
  {
    id: "1",
    slug: "sail-laboratory-official-launch-announcement",
    title: "Sail Laboratory — Official Launch Announcement\n株式会社Sail Laboratory — 開業のお知らせ",
    excerpt: "We are thrilled to announce that Sail Laboratory Co., Ltd. has officially opened its doors! From our headquarters in Tokyo, we embark on a mission to revolutionize AI-powered asset management with cutting-edge LLM Agents and advanced reinforcement learning.",
    content: `
      <h2>Official Launch Announcement</h2>
      <p><em>Date: August 15, 2025<br/>Location: Tokyo, Japan</em></p>

      <p>We are thrilled to announce that Sail Laboratory Co., Ltd. has officially opened its doors!</p>

      <p>From our headquarters in the heart of Tokyo (5F, Dia Gate Ikebukuro, 1-16-15 Minamiikebukuro, Toshima-ku, Tokyo 171-0022, Japan), we embark on a mission to revolutionize AI-powered asset management — combining cutting-edge Large Language Model (LLM) Agents, advanced reinforcement learning, and data-driven investment strategies to deliver smarter, faster, and more reliable financial decisions.</p>

      <p>Our team blends world-class AI research with real-world market expertise, offering:</p>

      <ul>
        <li>Long-term value investment strategies</li>
        <li>Dynamic swing trading powered by next-generation AI</li>
        <li>Custom AI-driven analytics solutions</li>
      </ul>

      <p>With an initial ¥50 million in assets under management, we are committed to creating sustainable value for our clients and partners while pushing the boundaries of what AI can achieve in finance.</p>

      <p>We're just getting started — and the future looks exciting.</p>

      <p>Stay tuned for insights, product updates, and opportunities to work with us.</p>

      <hr style="margin: 3rem 0;"/>

      <div style="margin-top: 2rem;">
        <h2>株式会社Sail Laboratory — 開業のお知らせ</h2>
      </div>

      <p>このたび、株式会社Sail Laboratoryは東京本社(〒171-0022 東京都豊島区南池袋１丁目１６−１５ ダイヤゲート池袋 5F)にて正式に開業いたしました。</p>

      <p>私たちは、最先端の大規模言語モデル（LLM）エージェント、高度な強化学習、そしてデータ駆動型の投資戦略を融合させ、よりスマートで迅速、信頼性の高い資産運用を実現します。</p>

      <p>当社は、世界水準のAI研究力と実マーケットでの経験を兼ね備え、以下のサービスを提供します：</p>

      <ul>
        <li>長期的な価値投資戦略</li>
        <li>次世代AIによるダイナミックなスイングトレード</li>
        <li>カスタムAI分析ソリューション</li>
      </ul>

      <p>初期運用資産5,000万円からスタートし、クライアントやパートナーの皆様に持続的な価値を創造するとともに、金融分野におけるAIの可能性を切り拓いてまいります。</p>

      <p>これは始まりに過ぎません。未来は、もっと面白くなります。</p>

      <p>今後も、最新情報、プロダクトアップデート、協業の機会などを随時お知らせいたします。</p>

      <p><strong>株式会社Sail Laboratory</strong><br/>
      <em>Smarter Investing. Powered by AI.</em></p>
    `,
    image: '/Capture.JPG',
    media: [
      {
        type: 'image',
        url: '/Capture.JPG',
        alt: 'SAIL Laboratory Company',
        caption: 'SAIL Laboratory - Official Launch Announcement'
      },
      {
        type: 'image',
        url: '/building.jpg',
        alt: 'SAIL Lab Tokyo Office Building',
        caption: 'SAIL Lab headquarters located in this building in Tokyo\'s Ikebukuro district'
      }
    ],
    category: "Company News",
    readTime: "2 min read",
    date: "2025-08-15",
    author: "Joe Wang",
    featured: true,
    views: 324,
    comments: 23,
    likes: 47
  },
  {
    id: "10",
    slug: "cto-wang-featured-in-waseda-university-interview",
    title: "SAIL Lab CTO Featured in Waseda University Interview\nSAIL Lab CTO、早稲田大学インタビューに掲載",
    excerpt: "Our CTO Joe Wang was featured in an exclusive interview by Waseda University's Computer Science and Engineering Department, sharing insights on his journey from academic research to founding SAIL Laboratory and pioneering AI-powered financial technology.",
    content: `
      <h2>From Waseda Research to AI Innovation in Finance</h2>
      <p><em>October 2025 | Waseda University</em></p>

      <p>We are honored to share that Joe Wang, SAIL Laboratory's CTO and Founder, has been featured in an exclusive alumni interview by <strong>Waseda University's Department of Computer Science and Engineering</strong>. The interview highlights Joe's remarkable journey from academic research to entrepreneurship and his contributions to advancing AI technology.</p>

      <h3>The Interview</h3>
      <p>The full interview is now published on Waseda University's official website:</p>
      <p><a href="https://www.cse.sci.waseda.ac.jp/careers/ob/wangzhao/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-mono">Visit the Waseda University Interview →</a></p>

      <h3>Joe's Journey</h3>
      <p>In the interview, Joe reflects on his academic foundation at Waseda University and how it shaped his career path:</p>

      <ul>
        <li><strong>Academic Excellence:</strong> His time at Waseda's Computer Science and Engineering Department, where he developed a strong foundation in AI and machine learning</li>
        <li><strong>Research Experience:</strong> Conducting cutting-edge research that would later inform his work at Sony and SAIL Lab</li>
        <li><strong>Entrepreneurial Vision:</strong> The decision to found SAIL Laboratory and apply AI research to financial technology</li>
        <li><strong>Industry Impact:</strong> Bridging the gap between academic research and real-world applications in finance</li>
      </ul>

      <h3>Key Insights Shared</h3>
      <p>The interview covers several important topics:</p>

      <ul>
        <li><strong>The Power of LLM Agents:</strong> How Large Language Model agents are transforming decision-making in finance and beyond</li>
        <li><strong>Research to Production:</strong> The challenges and rewards of turning academic research into commercial products</li>
        <li><strong>Dual Roles:</strong> Balancing fundamental research at Sony with practical innovation at SAIL Lab</li>
        <li><strong>Future of AI in Finance:</strong> Vision for how AI will continue to revolutionize asset management and trading</li>
        <li><strong>Advice for Students:</strong> Guidance for aspiring researchers and entrepreneurs in the AI field</li>
      </ul>

      <h3>Waseda's Legacy in AI Innovation</h3>
      <p>Joe's success reflects Waseda University's strong tradition in computer science and engineering education. His work at SAIL Lab continues to demonstrate the university's impact on global technology innovation.</p>

      <p>"Waseda provided me with not just technical knowledge, but also the critical thinking and problem-solving skills that are essential for both research and entrepreneurship," Joe shared in the interview. "The foundation I built there continues to guide my work today."</p>

      <h3>SAIL Lab's Mission</h3>
      <p>As highlighted in the interview, SAIL Laboratory represents the convergence of Joe's academic training, research experience, and entrepreneurial ambition:</p>

      <ul>
        <li>Applying cutting-edge AI research to practical financial solutions</li>
        <li>Building autonomous LLM agent systems for intelligent trading</li>
        <li>Maintaining academic rigor in commercial product development</li>
        <li>Contributing back to the research community through publications and open-source work</li>
      </ul>

      <p>This recognition from Waseda University underscores SAIL Lab's commitment to excellence and innovation at the intersection of AI and finance.</p>

      <hr style="margin: 3rem 0;"/>

      <h2>SAIL Lab CTO、早稲田大学卒業生インタビューに掲載</h2>
      <p><em>2025年10月 | 早稲田大学</em></p>

      <p>SAIL Laboratory の CTO 兼創業者である Joe Wang が、<strong>早稲田大学コンピュータ理工学科</strong>による卒業生インタビューに掲載されたことをお知らせいたします。このインタビューは、学術研究から起業まで、そして AI 技術の進歩への貢献に至る Joe の注目すべき道のりを紹介しています。</p>

      <h3>インタビュー</h3>
      <p>完全なインタビューは早稲田大学の公式ウェブサイトで公開されています：</p>
      <p><a href="https://www.cse.sci.waseda.ac.jp/careers/ob/wangzhao/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-mono">早稲田大学インタビューを見る →</a></p>

      <h3>Joe の道のり</h3>
      <p>インタビューで、Joe は早稲田大学での学びと、それがキャリアパスをどのように形作ったかを振り返ります：</p>

      <ul>
        <li><strong>学術的卓越性：</strong> AI と機械学習の強固な基盤を築いた早稲田大学のコンピュータ理工学科での時間</li>
        <li><strong>研究経験：</strong> 後に Sony と SAIL Lab での仕事に影響を与える最先端の研究を実施</li>
        <li><strong>起業家精神：</strong> SAIL Laboratory を設立し、AI 研究を金融技術に応用する決断</li>
        <li><strong>産業への影響：</strong> 学術研究と金融における実世界のアプリケーションとのギャップを埋める</li>
      </ul>

      <h3>共有された主要な洞察</h3>
      <p>インタビューはいくつかの重要なトピックをカバーしています：</p>

      <ul>
        <li><strong>LLM エージェントの力：</strong> 大規模言語モデルエージェントが金融やその他の分野での意思決定をどのように変革しているか</li>
        <li><strong>研究から製品化へ：</strong> 学術研究を商業製品に転換する際の課題と報酬</li>
        <li><strong>二つの役割：</strong> Sony での基礎研究と SAIL Lab での実践的イノベーションのバランス</li>
        <li><strong>金融における AI の未来：</strong> AI が資産運用と取引を革新し続ける方法についてのビジョン</li>
        <li><strong>学生へのアドバイス：</strong> AI 分野の研究者や起業家を目指す人々へのガイダンス</li>
      </ul>

      <h3>AI イノベーションにおける早稲田の遺産</h3>
      <p>Joe の成功は、コンピュータサイエンスとエンジニアリング教育における早稲田大学の強い伝統を反映しています。SAIL Lab での彼の仕事は、グローバルな技術革新に対する大学の影響を示し続けています。</p>

      <p>「早稲田は私に技術的知識だけでなく、研究と起業の両方に不可欠な批判的思考と問題解決スキルを提供してくれました」と Joe はインタビューで語りました。「そこで築いた基盤は、今日も私の仕事を導き続けています。」</p>

      <h3>SAIL Lab の使命</h3>
      <p>インタビューで強調されているように、SAIL Laboratory は Joe の学術的訓練、研究経験、起業家精神の収束を表しています：</p>

      <ul>
        <li>最先端の AI 研究を実用的な金融ソリューションに応用</li>
        <li>インテリジェント取引のための自律 LLM エージェントシステムの構築</li>
        <li>商業製品開発における学術的厳密性の維持</li>
        <li>出版物とオープンソース活動を通じた研究コミュニティへの貢献</li>
      </ul>

      <p>早稲田大学からのこの認識は、AI と金融の交差点における卓越性とイノベーションへの SAIL Lab のコミットメントを強調しています。</p>
    `,
    category: "Company News",
    readTime: "3 min read",
    date: "2025-10-08",
    author: "Joe Wang",
    featured: true,
    media: [
      {
        type: 'image',
        url: '/waseda-interview-page.jpg',
        alt: 'Waseda University Alumni Interview Page',
        caption: 'Joe Wang featured on Waseda University\'s official alumni interview page'
      },
      {
        type: 'image',
        url: '/waseda-joe-portrait.jpg',
        alt: 'Joe Wang - Waseda University Alumni',
        caption: 'SAIL Lab CTO Joe Wang, proud alumnus of Waseda University\'s Computer Science and Engineering Department'
      }
    ],
    views: 95,
    comments: 8,
    likes: 18
  },
  {
    id: "9",
    slug: "cto-presents-okg-at-coling-2025-as-sony-researcher",
    title: "SAIL Lab CTO Presents First LLM Agent Work at COLING 2025\nSAIL Lab CTO、COLING 2025で初のLLM Agent研究を発表",
    excerpt: "Our CTO Joe Wang, as a Sony researcher, presented the first LLM agent work in keyword generation at COLING 2025—'On-the-Fly Keyword Generation' introduces autonomous AI agents that dynamically adapt to market trends, revolutionizing digital advertising.",
    category: "Research News",
    readTime: "4 min read",
    date: "2025-01-20",
    author: "Joe Wang",
    featured: false,
    views: 128,
    comments: 14,
    likes: 25
  },
  {
    id: "8",
    slug: "cto-presents-research-at-kdd-2025-as-sony-researcher",
    title: "SAIL Lab CTO Presents Research at KDD 2025 as Sony Researcher\nSAIL Lab CTO、Sony研究員としてKDD 2025で研究を発表",
    excerpt: "Our CTO Joe Wang, in his role as a researcher at Sony, presented groundbreaking research on AI systems at KDD 2025 (Knowledge Discovery and Data Mining), one of the world's premier conferences in data science and machine learning.",
    content: `
      <h2>Research Excellence at the World's Premier Data Science Conference</h2>
      <p><em>August 2025 | Toronto, Canada</em></p>

      <p>We are proud to share that Joe Wang, SAIL Laboratory's CTO and Founder, presented cutting-edge research at <strong>KDD 2025 (ACM SIGKDD Conference on Knowledge Discovery and Data Mining)</strong> in his role as a <strong>researcher at Sony</strong>. The conference was held in Toronto, Canada, and is widely recognized as the world's premier conference in data science, data mining, and knowledge discovery, bringing together leading researchers, practitioners, and industry experts from around the globe.</p>

      <p>This dual role exemplifies the rich cross-pollination between academic research and practical industry applications. Joe's work at Sony focuses on fundamental AI research, while his leadership at SAIL Lab applies these insights to revolutionary financial technology solutions.</p>

      <h3>About KDD</h3>
      <p>The ACM SIGKDD Conference on Knowledge Discovery and Data Mining is the flagship conference of the Association for Computing Machinery's Special Interest Group on Knowledge Discovery and Data Mining. For over three decades, KDD has been the leading forum for sharing cutting-edge research in:</p>
      
      <ul>
        <li>Machine Learning and Deep Learning</li>
        <li>Data Mining and Pattern Recognition</li>
        <li>Large-scale Data Analytics</li>
        <li>AI Applications in Real-world Systems</li>
        <li>Reinforcement Learning and Decision Making</li>
      </ul>

      <h3>The Research: Auto-bidding in Real-Time Auctions</h3>
      <p>Joe Wang's presentation introduced <strong>"Auto-bidding in Real-Time Auctions via Oracle Imitation Learning"</strong>, a groundbreaking framework that addresses one of the most challenging problems in online advertising and real-time auction systems.</p>

      <p>The research proposes a novel approach that leverages oracle signals to bridge the gap between ideal decision-making and deployable bidding agents. By combining offline policy learning with real-time adaptability, the method significantly improves ad auction efficiency and return on investment.</p>

      <h3>Key Innovation: Oracle Imitation Learning</h3>
      <p>The core contribution of this work is the Oracle Imitation Learning (OIL) framework, which:</p>

      <ul>
        <li><strong>Leverages Oracle Signals:</strong> Uses optimal bidding signals from hindsight to guide the learning process, creating a more efficient training paradigm</li>
        <li><strong>Bridges Theory and Practice:</strong> Combines the theoretical optimality of oracle-based decisions with the practical constraints of real-time deployment</li>
        <li><strong>Offline Policy Learning:</strong> Trains bidding agents on historical auction data, learning from past optimal decisions without online experimentation costs</li>
        <li><strong>Real-time Adaptability:</strong> Enables deployed agents to adapt to changing auction dynamics and market conditions in real-time</li>
        <li><strong>Improves ROI:</strong> Demonstrates significant improvements in return on investment compared to traditional auto-bidding approaches</li>
      </ul>

      <h3>Research Resources</h3>
      <p>The full research is available to the academic community:</p>
      <ul>
        <li><strong>Paper:</strong> <a href="https://arxiv.org/abs/2412.11434" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">arXiv:2412.11434</a></li>
        <li><strong>Code:</strong> <a href="https://github.com/sony/oil" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">github.com/sony/oil</a></li>
        <li><strong>Video Presentation:</strong> Available on YouTube (embedded below)</li>
      </ul>

      <h3>Community Reception</h3>
      <p>The presentation received significant interest from the KDD community, sparking engaging discussions on:</p>

      <ul>
        <li>The ethical implications of AI-driven financial systems</li>
        <li>Challenges in deploying LLMs in high-stakes real-time environments</li>
        <li>Future directions for multi-agent systems in finance</li>
        <li>Balancing model complexity with interpretability and reliability</li>
      </ul>

      <p>"Presenting at KDD 2025 was an incredible opportunity to share our work with the world's leading data science community," said Joe Wang. "The feedback and discussions have been invaluable, and we're excited to incorporate these insights into our ongoing research and product development."</p>

      <h3>Bridging Research and Industry</h3>
      <p>While the research presented at KDD was conducted as part of Joe's work at Sony, the insights and methodologies developed inform SAIL Lab's approach to building practical financial technology solutions:</p>

      <ul>
        <li>Advanced AI techniques from fundamental research inspire our trading algorithms</li>
        <li>Research-backed methodologies enhance our risk management systems</li>
        <li>Cutting-edge data mining approaches improve our market analysis capabilities</li>
        <li>Academic rigor in explainability translates to transparency in our automated systems</li>
      </ul>

      <p>This synergy between fundamental research at Sony and practical applications at SAIL Lab exemplifies how academic excellence can drive real-world innovation in financial technology.</p>

      <hr style="margin: 3rem 0;"/>

      <h2>SAIL Lab CTO、Sony研究員としてKDD 2025で研究を発表</h2>
      <p><em>2025年8月 | トロント、カナダ</em></p>

      <p>SAIL Laboratory の CTO 兼創業者である Joe Wang が、<strong>Sony の研究員</strong>として、カナダのトロントで開催された<strong>KDD 2025（ACM SIGKDD Conference on Knowledge Discovery and Data Mining）</strong>で最先端の研究を発表したことをご報告いたします。KDD は、データサイエンス、データマイニング、知識発見における世界最高峰の国際会議として広く認識されており、世界中から第一線の研究者、実務家、業界専門家が集まります。</p>

      <p>この二つの役割は、学術研究と実践的な産業応用との豊かな相互交流を示しています。Joe の Sony での研究は基礎的な AI 研究に焦点を当てており、SAIL Lab でのリーダーシップはこれらの洞察を革新的な金融技術ソリューションに応用しています。</p>

      <h3>KDD について</h3>
      <p>ACM SIGKDD Conference on Knowledge Discovery and Data Mining は、ACM（Association for Computing Machinery）の知識発見とデータマイニングに関する特別興味グループの旗艦会議です。30年以上にわたり、KDD は以下の分野における最先端の研究を共有する主要なフォーラムとなっています：</p>
      
      <ul>
        <li>機械学習とディープラーニング</li>
        <li>データマイニングとパターン認識</li>
        <li>大規模データ解析</li>
        <li>実世界システムにおける AI アプリケーション</li>
        <li>強化学習と意思決定</li>
      </ul>

      <h3>研究内容：リアルタイムオークションにおける自動入札</h3>
      <p>Joe Wang の発表は、<strong>「Oracle Imitation Learning によるリアルタイムオークションにおける自動入札」</strong>を紹介しました。これは、オンライン広告とリアルタイムオークションシステムにおける最も困難な問題の一つに取り組む画期的なフレームワークです。</p>

      <p>この研究は、オラクル信号を活用して、理想的な意思決定と展開可能な入札エージェントとのギャップを埋める新しいアプローチを提案します。オフラインポリシー学習とリアルタイム適応性を組み合わせることで、この手法は広告オークションの効率と投資収益率を大幅に向上させます。</p>

      <h3>主要なイノベーション：Oracle Imitation Learning</h3>
      <p>この研究の中核的な貢献は、Oracle Imitation Learning（OIL）フレームワークです：</p>

      <ul>
        <li><strong>オラクル信号の活用：</strong> 事後的な最適入札信号を使用して学習プロセスを導き、より効率的な訓練パラダイムを作成</li>
        <li><strong>理論と実践の架け橋：</strong> オラクルベースの決定の理論的最適性と、リアルタイム展開の実践的制約を組み合わせる</li>
        <li><strong>オフラインポリシー学習：</strong> 過去のオークションデータで入札エージェントを訓練し、オンライン実験コストなしで過去の最適決定から学習</li>
        <li><strong>リアルタイム適応性：</strong> 展開されたエージェントが、変化するオークションダイナミクスと市場状況にリアルタイムで適応できるようにする</li>
        <li><strong>ROI の向上：</strong> 従来の自動入札アプローチと比較して、投資収益率の大幅な改善を実証</li>
      </ul>

      <h3>研究リソース</h3>
      <p>完全な研究は学術コミュニティに公開されています：</p>
      <ul>
        <li><strong>論文：</strong> <a href="https://arxiv.org/abs/2412.11434" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">arXiv:2412.11434</a></li>
        <li><strong>コード：</strong> <a href="https://github.com/sony/oil" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">github.com/sony/oil</a></li>
        <li><strong>ビデオプレゼンテーション：</strong> YouTube で利用可能（以下に埋め込み）</li>
      </ul>

      <h3>コミュニティの反応</h3>
      <p>この発表は KDD コミュニティから大きな関心を集め、以下について活発な議論が行われました：</p>

      <ul>
        <li>AI 駆動型金融システムの倫理的影響</li>
        <li>高リスクのリアルタイム環境で LLM を展開する際の課題</li>
        <li>金融におけるマルチエージェントシステムの将来の方向性</li>
        <li>モデルの複雑さと解釈可能性および信頼性のバランス</li>
      </ul>

      <p>「KDD 2025 での発表は、世界をリードするデータサイエンスコミュニティと私たちの研究を共有する素晴らしい機会でした」と Joe Wang は述べました。「フィードバックと議論は非常に貴重であり、これらの洞察を進行中の研究と製品開発に組み込むことを楽しみにしています。」</p>

      <h3>研究と産業の架け橋</h3>
      <p>KDD で発表された研究は Joe の Sony での研究活動の一環として実施されたものですが、開発された洞察と方法論は SAIL Lab の実践的な金融技術ソリューションの構築アプローチに反映されています：</p>

      <ul>
        <li>基礎研究から得られた高度な AI 技術が当社の取引アルゴリズムにインスピレーションを与える</li>
        <li>研究に基づいた方法論がリスク管理システムを強化</li>
        <li>最先端のデータマイニング手法が市場分析能力を向上</li>
        <li>説明可能性における学術的厳密さが自動化システムの透明性に変換される</li>
      </ul>

      <p>Sony での基礎研究と SAIL Lab での実践的応用とのこの相乗効果は、学術的卓越性が金融技術における実世界のイノベーションをどのように推進できるかを示しています。</p>
    `,
    category: "Research News",
    readTime: "5 min read",
    date: "2025-08-20",
    author: "Joe Wang",
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/EBEfLzuS0JQ?si=ZOFRiPzoELrlgBJz',
        alt: 'Auto-bidding in Real-Time Auctions via Oracle Imitation Learning - KDD 2025',
        caption: 'Research presentation: "Auto-bidding in Real-Time Auctions via Oracle Imitation Learning" at KDD 2025'
      },
      {
        type: 'image',
        url: '/kdd-joe-presenting.jpg',
        alt: 'Joe Wang presenting at KDD 2025',
        caption: 'CTO Joe Wang delivering the research presentation at KDD 2025 in Toronto'
      },
      {
        type: 'image',
        url: '/kdd-conference-hall.jpg',
        alt: 'KDD 2025 Conference Hall',
        caption: 'The main conference hall at KDD 2025 with attendees from around the world'
      },
      {
        type: 'image',
        url: '/kdd-poster-session.jpg',
        alt: 'Poster Session at KDD 2025',
        caption: 'Interactive poster session discussing multi-agent trading systems'
      }
    ],
    views: 142,
    comments: 18,
    likes: 29
  },
  {
    id: "7",
    slug: "cto-attends-sts-forum-2025",
    title: "SAIL Lab CTO Participates in STS Forum 2025\nSAIL Lab CTO、STS フォーラム 2025 に参加",
    excerpt: "Our CTO Joe Wang attended the prestigious Science and Technology in Society (STS) Forum 2025 in Kyoto, Japan, engaging with global leaders on AI governance, ethical technology deployment, and the future of AI in financial markets.",
    content: `
      <h2>Representing SAIL Lab at the Global Stage</h2>
      <p><em>October 2025 | Kyoto, Japan</em></p>

      <p>We are proud to announce that Joe Wang, our Chief Technology Officer and Founder, attended the prestigious <strong>Science and Technology in Society (STS) Forum 2025</strong> held in Kyoto, Japan. This annual international conference brings together leaders from government, industry, academia, and civil society to discuss critical global issues at the intersection of science, technology, and societal impact.</p>

      <h3>About the STS Forum</h3>
      <p>The STS Forum is one of the world's most influential platforms for dialogue on science and technology policy. Each year, it gathers Nobel laureates, government ministers, CEOs of leading corporations, and renowned researchers to address pressing challenges facing humanity—from climate change and healthcare innovation to artificial intelligence governance and digital ethics.</p>

      <p>This year's forum was particularly distinguished by the presence of <strong>His Majesty the Emperor of Japan</strong>, who delivered an inspiring opening address emphasizing the importance of harmonizing technological advancement with societal well-being. <strong>Prime Minister Shigeru Ishiba</strong> also addressed the forum, outlining Japan's vision for responsible AI development and international cooperation in science and technology.</p>
      
      <p>The forum brought together an unprecedented gathering of <strong>13 Nobel Prize laureates</strong>, representing diverse fields from physics and chemistry to economics and peace, creating a unique environment for cross-disciplinary dialogue and knowledge exchange.</p>

      <h3>Young Leaders Program</h3>
      <p>As part of the forum, Joe Wang was selected to participate in the prestigious <strong>STS Forum Young Leaders Program</strong>—an initiative designed to nurture the next generation of leaders who will shape the future of science, technology, and society. This program brings together exceptional young professionals and researchers from around the world to engage in deep discussions with Nobel laureates, industry pioneers, and policy makers.</p>

      <p>During the Young Leaders sessions, Joe had the unique opportunity to engage in direct conversations with <strong>Nobel Prize winners</strong>, discussing topics ranging from the philosophical implications of artificial intelligence to practical challenges in implementing ethical AI systems in real-world applications. These intimate discussions provided invaluable perspectives on how breakthrough scientific discoveries translate into societal impact.</p>

      <h3>Key Themes and Discussions</h3>
      <p>During this year's forum, Joe Wang participated in several key sessions focused on:</p>
      
      <ul>
        <li><strong>AI Governance and Regulatory Frameworks:</strong> Exploring how nations can develop balanced regulations that foster innovation while protecting citizens from potential AI risks.</li>
        <li><strong>Ethical AI Deployment in Financial Markets:</strong> Discussing transparency, fairness, and accountability in algorithmic trading and investment management systems.</li>
        <li><strong>The Future of AI in Finance:</strong> Examining how Large Language Models (LLMs) and reinforcement learning are transforming asset management, risk assessment, and financial decision-making.</li>
        <li><strong>Responsible Innovation:</strong> Addressing the ethical considerations of deploying advanced AI systems in high-stakes environments.</li>
        <li><strong>Cross-Generational Knowledge Transfer:</strong> Learning from Nobel laureates about the journey from fundamental research to world-changing applications.</li>
      </ul>

      <h3>SAIL Lab's Perspective</h3>
      <p>As a company at the forefront of AI-powered asset management, SAIL Laboratory is deeply committed to the responsible development and deployment of AI technologies. During the forum, Joe Wang shared insights on:</p>

      <ul>
        <li>How we integrate ethical considerations into our AI-driven trading systems</li>
        <li>Our approach to ensuring transparency and explainability in automated investment decisions</li>
        <li>The importance of human oversight in AI-powered financial systems</li>
        <li>Building trust with clients through robust risk management protocols</li>
      </ul>

      <p>"The STS Forum provided an invaluable opportunity to engage with global thought leaders and contribute to crucial conversations about AI's role in society," said Joe Wang. "As we continue to push the boundaries of what AI can achieve in finance, we remain firmly committed to doing so responsibly, ethically, and with full consideration of the broader societal impact."</p>

      <h3>Looking Ahead</h3>
      <p>The insights and connections from STS Forum 2025 will directly inform SAIL Lab's ongoing research and development efforts. We are particularly excited about:</p>

      <ul>
        <li>Enhancing our AI governance framework based on international best practices</li>
        <li>Collaborating with regulatory bodies to help shape sensible AI policies</li>
        <li>Contributing to academic research on ethical AI in finance</li>
        <li>Sharing our learnings with the broader fintech and AI communities</li>
      </ul>

      <p>We believe that meaningful participation in global forums like the STS Forum is essential for staying at the cutting edge of responsible AI innovation.</p>

      <hr style="margin: 3rem 0;"/>

      <h2>SAIL Lab CTO、STS フォーラム 2025 に参加</h2>
      <p><em>2025年10月 | 京都、日本</em></p>

      <p>当社の最高技術責任者（CTO）兼創業者であるJoe Wangが、京都で開催された権威ある<strong>科学技術と社会フォーラム（STS Forum）2025</strong>に出席したことをご報告いたします。本フォーラムは、科学技術と社会的影響の接点における重要なグローバル課題について議論するため、政府、産業界、学術界、市民社会のリーダーが一堂に会する国際会議です。</p>

      <h3>STS フォーラムについて</h3>
      <p>STS フォーラムは、科学技術政策に関する世界で最も影響力のある対話の場の一つです。毎年、ノーベル賞受賞者、各国の閣僚、主要企業のCEO、著名な研究者が集まり、気候変動、医療イノベーション、AI ガバナンス、デジタル倫理など、人類が直面する喫緊の課題に取り組んでいます。</p>

      <p>今年のフォーラムは、<strong>天皇陛下</strong>のご臨席を賜り、技術の進歩と社会の幸福を調和させることの重要性を強調する感動的な開会の辞を賜りました。また、<strong>石破茂首相</strong>もフォーラムで演説し、責任ある AI 開発と科学技術における国際協力に関する日本のビジョンを示されました。</p>
      
      <p>フォーラムには、物理学、化学、経済学、平和など多様な分野から<strong>13名のノーベル賞受賞者</strong>が集まり、分野を超えた対話と知識交換のための独特な環境が創出されました。</p>

      <h3>ヤングリーダーズプログラム</h3>
      <p>フォーラムの一環として、Joe Wang は権威ある<strong>STS フォーラム ヤングリーダーズプログラム</strong>への参加者に選ばれました。このプログラムは、科学、技術、社会の未来を形作る次世代のリーダーを育成することを目的とした取り組みです。世界中から集まった優秀な若手専門家や研究者が、ノーベル賞受賞者、業界のパイオニア、政策立案者と深い議論を行います。</p>

      <p>ヤングリーダーズセッションでは、Joe は<strong>ノーベル賞受賞者</strong>と直接対話する貴重な機会を得ました。人工知能の哲学的意味合いから、実世界のアプリケーションにおける倫理的 AI システムの実装における実践的な課題まで、幅広いトピックについて議論しました。これらの親密な対話は、画期的な科学的発見がどのように社会的影響に変換されるかについて、貴重な視点を提供してくれました。</p>

      <h3>主要テーマと議論</h3>
      <p>今年のフォーラムでは、Joe Wang が以下の重要なセッションに参加しました：</p>

      <ul>
        <li><strong>AI ガバナンスと規制枠組み：</strong> イノベーションを促進しつつ、AI のリスクから市民を保護するバランスの取れた規制を各国がどのように開発できるかを探求。</li>
        <li><strong>金融市場における倫理的な AI 展開：</strong> アルゴリズム取引と投資管理システムにおける透明性、公平性、説明責任について議論。</li>
        <li><strong>金融における AI の未来：</strong> 大規模言語モデル（LLM）と強化学習が資産運用、リスク評価、財務意思決定をどのように変革しているかを検討。</li>
        <li><strong>責任あるイノベーション：</strong> 高リスク環境における高度な AI システムの展開に関する倫理的考慮事項への対処。</li>
        <li><strong>世代を超えた知識の伝達：</strong> ノーベル賞受賞者から、基礎研究から世界を変えるアプリケーションへの道のりについて学ぶ。</li>
      </ul>

      <h3>SAIL Lab の視点</h3>
      <p>AI 駆動型資産運用の最前線にある企業として、SAIL Laboratory は AI 技術の責任ある開発と展開に深く取り組んでいます。フォーラムで、Joe Wang は以下について洞察を共有しました：</p>

      <ul>
        <li>AI 駆動型取引システムに倫理的考慮事項を統合する方法</li>
        <li>自動投資決定における透明性と説明可能性を確保するアプローチ</li>
        <li>AI 駆動型金融システムにおける人間の監視の重要性</li>
        <li>堅牢なリスク管理プロトコルを通じてクライアントとの信頼を構築すること</li>
      </ul>

      <p>「STS フォーラムは、グローバルな思想的リーダーと交流し、社会における AI の役割に関する重要な対話に貢献する貴重な機会でした」と Joe Wang は述べました。「金融分野で AI が達成できることの限界を押し広げ続ける中で、私たちは責任を持って、倫理的に、そしてより広範な社会的影響を十分に考慮しながら行うことを固く約束しています。」</p>

      <h3>今後の展望</h3>
      <p>STS フォーラム2025 からの洞察とつながりは、SAIL Lab の継続的な研究開発活動に直接反映されます。特に以下について期待しています：</p>

      <ul>
        <li>国際的なベストプラクティスに基づいた AI ガバナンスフレームワークの強化</li>
        <li>合理的な AI 政策の形成を支援するため規制当局との協力</li>
        <li>金融における倫理的 AI に関する学術研究への貢献</li>
        <li>より広範なフィンテックおよび AI コミュニティとの学びの共有</li>
      </ul>

      <p>STS フォーラムのようなグローバルフォーラムへの有意義な参加は、責任ある AI イノベーションの最先端にとどまるために不可欠であると信じています。</p>
    `,
    category: "Company News",
    readTime: "6 min read",
    date: "2025-10-10",
    author: "Joe Wang",
    featured: true,
    media: [
      {
        type: 'image',
        url: '/sts-emperor-speech.jpg',
        alt: 'His Majesty the Emperor of Japan\'s Opening Address',
        caption: 'His Majesty the Emperor of Japan delivering the opening address at STS Forum 2025'
      },
      {
        type: 'image',
        url: '/sts-pm-ishiba.jpg',
        alt: 'Prime Minister Shigeru Ishiba at STS Forum',
        caption: 'Japan\'s Prime Minister Shigeru Ishiba addressing the forum participants'
      },
      {
        type: 'image',
        url: '/sts-young-leaders.jpg',
        alt: 'Young Leaders Program Session',
        caption: 'Joe Wang with fellow participants in the STS Forum Young Leaders Program'
      },
      {
        type: 'image',
        url: '/sts-nobel-laureates.jpg',
        alt: '13 Nobel Prize Winners at STS Forum',
        caption: 'Group photo with 13 Nobel Prize laureates who participated in the forum discussions'
      },
      {
        type: 'image',
        url: '/sts-banquet.jpg',
        alt: 'STS Forum Official Banquet',
        caption: 'The official banquet gathering global leaders, Nobel laureates, and young leaders'
      }
    ],
    views: 156,
    comments: 12,
    likes: 28,
    hidden: true // Temporarily hide this post
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

  // Find the blog post by slug
  const post = extendedBlogPosts.find(p => p.slug === params.slug);

  if (!post || post.hidden) {
    notFound();
  }

  const [likes, setLikes] = useState(post.likes);

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

      <div className="relative z-10 container mx-auto pt-32 pb-24 px-6">
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

            <h1 className="text-4xl md:text-5xl font-mono mb-6 leading-tight">
              {post.title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < post.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h1>

            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-mono text-primary text-lg">LLM-Agentic Trader Joe</div>
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