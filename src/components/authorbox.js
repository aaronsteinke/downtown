import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"


const Authorbox = (props) => {
  console.log(props)
  const author = props.authors[0].author.document
  console.log(author.uid)
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={author.data.profile_pic.thumbnails.Square.fixed}
        alt={author.data.first_name + ` ` + author.data.last_name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author.data.first_name} {author.data.last_name}</strong> | {author.data.position}
      </p>
    </div>
  )
}

export default Authorbox