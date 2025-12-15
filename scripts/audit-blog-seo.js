require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function auditBlogSEO() {
  console.log('🔍 Auditing Blog Posts SEO...\n');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, title_en, excerpt, excerpt_en, meta_title, meta_description, tags, image_url, category, status')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  console.log(`Found ${posts.length} total blog posts\n`);
  console.log('=' .repeat(80));

  let issues = {
    noMetaTitle: [],
    noMetaDescription: [],
    noTags: [],
    noImage: [],
    noExcerpt: [],
    noCategory: [],
    shortExcerpt: [],
    longTitle: []
  };

  posts.forEach((post, index) => {
    const title = post.title_en || post.title;
    const excerpt = post.excerpt_en || post.excerpt;

    console.log(`\n${index + 1}. ${title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Status: ${post.status}`);

    let postIssues = [];

    // Check meta_title
    if (!post.meta_title) {
      postIssues.push('❌ Missing meta_title');
      issues.noMetaTitle.push(post.slug);
    } else {
      console.log(`   ✅ Meta Title: ${post.meta_title.substring(0, 50)}...`);
    }

    // Check meta_description
    if (!post.meta_description) {
      postIssues.push('❌ Missing meta_description');
      issues.noMetaDescription.push(post.slug);
    } else {
      console.log(`   ✅ Meta Desc: ${post.meta_description.substring(0, 50)}...`);
    }

    // Check tags
    if (!post.tags || post.tags.length === 0) {
      postIssues.push('❌ Missing tags');
      issues.noTags.push(post.slug);
    } else {
      console.log(`   ✅ Tags: ${post.tags.length} tags`);
    }

    // Check image
    if (!post.image_url) {
      postIssues.push('❌ Missing image');
      issues.noImage.push(post.slug);
    } else {
      console.log(`   ✅ Image: Yes`);
    }

    // Check excerpt
    if (!excerpt) {
      postIssues.push('❌ Missing excerpt');
      issues.noExcerpt.push(post.slug);
    } else if (excerpt.length < 100) {
      postIssues.push('⚠️ Excerpt too short (<100 chars)');
      issues.shortExcerpt.push(post.slug);
    } else {
      console.log(`   ✅ Excerpt: ${excerpt.length} chars`);
    }

    // Check category
    if (!post.category) {
      postIssues.push('❌ Missing category');
      issues.noCategory.push(post.slug);
    } else {
      console.log(`   ✅ Category: ${post.category}`);
    }

    // Check title length (should be <60 for SEO)
    if (title && title.length > 60) {
      postIssues.push(`⚠️ Title too long (${title.length} chars, should be <60)`);
      issues.longTitle.push(post.slug);
    }

    if (postIssues.length > 0) {
      console.log(`   Issues:`);
      postIssues.forEach(issue => console.log(`      ${issue}`));
    }
  });

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SEO AUDIT SUMMARY\n');

  const publishedPosts = posts.filter(p => p.status === 'published').length;
  console.log(`Total Posts: ${posts.length}`);
  console.log(`Published: ${publishedPosts}`);
  console.log(`Draft: ${posts.length - publishedPosts}`);

  console.log('\n🚨 Issues Found:\n');
  console.log(`Missing meta_title: ${issues.noMetaTitle.length} posts`);
  if (issues.noMetaTitle.length > 0) {
    console.log(`   → ${issues.noMetaTitle.join(', ')}`);
  }

  console.log(`Missing meta_description: ${issues.noMetaDescription.length} posts`);
  if (issues.noMetaDescription.length > 0) {
    console.log(`   → ${issues.noMetaDescription.join(', ')}`);
  }

  console.log(`Missing tags: ${issues.noTags.length} posts`);
  console.log(`Missing image: ${issues.noImage.length} posts`);
  console.log(`Missing excerpt: ${issues.noExcerpt.length} posts`);
  console.log(`Missing category: ${issues.noCategory.length} posts`);
  console.log(`Short excerpt (<100 chars): ${issues.shortExcerpt.length} posts`);
  console.log(`Long title (>60 chars): ${issues.longTitle.length} posts`);

  // Calculate SEO score
  const totalChecks = posts.length * 7;
  const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
  const score = Math.round(((totalChecks - totalIssues) / totalChecks) * 100);

  console.log(`\n📈 Overall SEO Score: ${score}%`);

  if (score < 70) {
    console.log('⚠️ SEO needs significant improvement');
  } else if (score < 90) {
    console.log('📝 SEO is decent but could be better');
  } else {
    console.log('✅ SEO is in good shape!');
  }
}

auditBlogSEO().catch(console.error);
