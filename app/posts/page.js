import Image from 'next/image'
import Link from 'next/link';
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import style from './posts.module.css'

async function fetchBlogData() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { posts }
}

async function BlogPage() {
  const { posts } = await fetchBlogData()
  return (
    <main className="container lg:px-8 max-w-[1280px]">
      <div className={`${style['postHeader']} px-6 pt-8 pb-4`}>
        <div className="left inline">
          <div className="text-2xl font-bold">文章</div>
        </div>
        <div className="right inline">
          <Image className="article-avatar" src="https://imgur.lzmun.com/picgo/after2022/tripper2whitefull.png_avatar"
            width={32} height={32}
            alt="logo" automatically="true" provided="true"
          />
        </div>
      </div>
      <hr />
      <div className='grid lg:grid-cols-3'>
        <div className='lg:col-span-2	'>
          {posts && posts.map((post) => (
            <div key={post.url}>
            <Link href={`/post/${post.url}`} >
              <div className={`${style['postEntry']} my-8 p-6`}>
                  <div className='text-2xl font-medium'>{post.title}</div>
                  <div className='opacity-60'>{format(parseISO(post.date), 'yyyy-MM-dd')}</div>
              </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default BlogPage
