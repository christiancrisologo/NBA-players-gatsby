import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Team from '../components/team'
import '../assets/css/global.css'

const IndexPage = () => (
  <Layout>
    <SEO title="NBA Players with Gatsby" />
    <Team />
  </Layout>
)

export default IndexPage
