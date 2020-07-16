import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Authorbox from "../components/authorbox"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.prismicPost
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.data.post_title.text}
        description={post.data.excerpt}
      />
      <article>
        <header>
          <Image fluid={post.data.featured_image.fluid} />
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.data.post_title.text}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.data.release_date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.data.excerpt }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Authorbox authors={post.data.authors}/>
        </footer>
      </article>

      {/* <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    prismicPost( uid: { eq: $slug  }) {
      uid
      data {
        excerpt
        post_title {
          text
        }
        body {
          ... on PrismicPostBodyImage {
            id
            primary {
              image {
                url
              }
              image_caption {
                html
              }
            }
          }
          ... on PrismicPostBodyQuote {
            id
            primary {
              name_of_the_author {
                text
              }
              portrait_author {
                url
              }
              quote {
                text
              }
            }
          }
          ... on PrismicPostBodyText {
            id
            primary {
              text {
                html
              }
            }
          }
        }
        featured_image {
          alt
          fluid(maxHeight:1000,maxWidth: 1000) {
            ...GatsbyPrismicImageFluid
          }
        }
        authors {
          author {
            document {
              ... on PrismicAuthor {
                id
                data {
                  first_name
                  last_name
                  short_bio {
                    html
                  }
                  position
                  profile_pic {
                    thumbnails {
                      Square{
                        fixed(width: 75){
                        ...GatsbyPrismicImageFixed
                        }
                      }
                    }
                  }
                }
                uid
              }
            }
          }
        }
      }
    }
  }
`
