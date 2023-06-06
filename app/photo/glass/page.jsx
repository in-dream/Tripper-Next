"use server"
import Image from 'next/image'
import Link from 'next/link'
import style from '../photo.module.css'
import { compareDesc, format, parseISO } from 'date-fns'
const { Client } = require("@notionhq/client")

export async function FetchNotionDb() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const databaseId = '6b35ba718f404e01a687a3043c9dd8bf';
  const response = await notion.databases.query({
    database_id: databaseId,
    page_size: 12,
    sorts: [
      {
        "property": "Date",
        "direction": "descending"
      }
    ]
  });
  const notionData = response.results
  console.log()
  return (notionData)
}

export default async function GlassPage() {
  const notionData = await FetchNotionDb()
  return (
    <main className='text-white'>
      <div className={`text-white container max-w-[1280px] py-8 grid grid-cols-2 md:grid-cols-4 gap-2`}>
        {notionData.map((item) => (
          <div key={item.id} className='md:aspect-[6/9]'>
            <Image className='aspect-square object-cover'
              src={item.properties.Image.files[0].file.url} alt={item.properties.Name.title[0].plain_text} width={600} height={600} />
            <div className='hidden md:flex py-4 md:py-8 flex-col gap-2'>
              <div className='text-sm opacity-60'>{format(parseISO(item.properties.Date.date.start), 'yyyy-MM-dd')}</div>
              <div className='text-xl'>
                {item.properties.Name.title[0].plain_text}
              </div>
              {item.properties.Text.rich_text[0] && (
                <div className='text-sm opacity-60'>
                  {item.properties.Text.rich_text[0].plain_text}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='text-center pb-16 opacity-60 font-light'>
        <div className='py-6'>Come to Instagram and follow me to see more</div>
        <Link href='https://www.instagram.com/tripper.pre/' target='_blank' className='text-4xl'>@press.moment</Link>
      </div>
    </main>
  )
}