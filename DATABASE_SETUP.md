# 数据库设置说明 / Database Setup Guide

## Vercel Postgres 设置

### 1. 在 Vercel 中创建 Postgres 数据库

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 选择您的 `sailab` 项目
3. 进入 **Storage** 标签
4. 点击 **Create Database** → **Postgres**
5. 选择 **Hobby** 计划（免费）
6. 输入数据库名称：`sailab-quota-db`
7. 选择地区：**Tokyo** (ap-northeast-1)
8. 点击 **Create**

### 2. 获取数据库连接信息

创建完成后，Vercel 会自动生成以下环境变量：

```
POSTGRES_URL=postgres://...
POSTGRES_PRISMA_URL=postgres://...
POSTGRES_URL_NON_POOLING=postgres://...
POSTGRES_USER=...
POSTGRES_HOST=...
POSTGRES_PASSWORD=...
POSTGRES_DATABASE=...
```

### 3. 在 Vercel 项目中添加环境变量

1. 在项目设置中找到 **Environment Variables**
2. 添加上述所有环境变量
3. 确保所有环境（Production, Preview, Development）都添加了这些变量

### 4. 重新部署项目

环境变量添加后，需要重新部署项目：

```bash
git add .
git commit -m "Add database support for quota tracking"
git push
```

### 5. 验证数据库连接

部署完成后，访问 Dashboard 并尝试进行一次股票分析，系统会自动创建 `user_quotas` 表。

## 数据库表结构

```sql
CREATE TABLE user_quotas (
  user_id VARCHAR(255) PRIMARY KEY,
  used_today INTEGER DEFAULT 0,
  last_reset DATE DEFAULT CURRENT_DATE,
  tier VARCHAR(50) DEFAULT 'Starter',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 功能说明

- **每日重置**：每天午夜自动重置配额
- **持久化存储**：配额数据存储在 Vercel Postgres 中
- **多用户支持**：每个用户独立的配额跟踪
- **Plan 区分**：不同 Plan 有不同的配额限制

## 故障排除

如果遇到数据库连接问题：

1. 检查环境变量是否正确设置
2. 确认 Vercel Postgres 数据库状态正常
3. 查看 Vercel 函数日志中的错误信息
4. 重新部署项目

## 成本说明

- Vercel Postgres Hobby 计划：**免费**
- 包含：1GB 存储，每月 1000 次查询
- 对于配额跟踪功能完全够用
