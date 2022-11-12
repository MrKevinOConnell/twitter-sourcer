import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Client } from "twitter-api-sdk";
import { Card, Text} from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Home() {
  const client = new Client(process.env.BEARER_TOKEN as string);
  const [tweets,setTweets] = useState(null)

  const getTweets = async () => {
    const tweets = await fetch("/api/tweets")
    if(tweets.ok) {
      const json = await tweets.json()
      console.log("tweet tweet",json)
      setTweets(json.response)
    }

  }
  useEffect(() => {
   getTweets()
  },[])
  if(!tweets) {
    return (<div>no tweets</div>)
  }
  return tweets && (
    <div className={styles.container}>
      <Text size="xl" mt={5} align="center">Who's hiring?</Text>
      {tweets.map(tweet => {
return ( <Card m={10} component="a" target="_blank" href={`https://www.twitter.com/${tweet.username}/status/${tweet.id}`} shadow="sm" p="lg" radius="md" withBorder>
  <Text>@{tweet.username}</Text>
  <Text size="sm">{tweet.tweet}</Text>
  </Card>)
      })}
    
    </div>
  )
}
