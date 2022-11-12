// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "twitter-api-sdk";
type Data = {
  response: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    let tweets = []
    var options = {  
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        },
      }
      const query = `-civil -mechanical -electrical -biomedical -construction -chemical -is:retweet (I'm OR We're) hiring (engineers OR (an engineer))`.replace(" ","%20")
    const response = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=100&expansions=author_id`,options)
    if(response.ok) {
        const res = await response.json()
    
        const ids = res.data.map((tweet: any) => tweet.author_id)
        const users =  await fetch(`https://api.twitter.com/2/users?ids=${ids}`,options)
        if(users.ok) {
            const json = await users.json()
            console.log("json",json)
            const finishedUsers = json.data.map((user: any,index: number) => {return {username: user.username, id: res.data[index].id, tweet: res.data[index].text}})
            tweets = finishedUsers
            
        }
        
    }
    res.json({ response: tweets })
}
