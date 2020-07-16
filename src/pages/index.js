import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Authorbox from "../components/authorbox"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allPrismicPost.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.data.post_title.text || "not found"
        const featuredImage = node.data.featured_image.fluid
        const postDate = new Date(node.data.release_date).toLocaleDateString()
        console.log(node.data);
        return (
          <article key={node.uid}>
            <header>
              <Image fluid={featuredImage} />
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.uid}>
                  {title}
                </Link>
              </h3>
              <small>{postDate}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.data.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    allPrismicPost(sort: {fields: data___release_date, order: DESC}) {
      edges {
        node {
          uid
          data {
            release_date
            excerpt
            post_title {
              text
            }
            featured_image {
              alt
              fluid(maxHeight:1000,maxWidth: 1000) {
                ...GatsbyPrismicImageFluid
              }
            }
          }
        }
      }
    }
  }
`
