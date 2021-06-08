import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import React from "react"

function SEO({ description, lang, meta, image: metaImage, title, pathname }) {
    const site = {
        siteMetadata: {
            title: 'NRA Test',
            description: "Prepare for ssc, cgl, chsl, bank, po, sbi, rrb, nra, cet and railway with free online class, doubt and quiz sections.",
            author: "nratest",
            keywords: [
                'Free online class',
                'SSC Quiz',
                'Bank Quiz',
                'current affairs quiz',
                'sbi po online coaching',
                'bank po online coaching',
                'ssc chsl',
                'gk questions',
                'amazon quiz answers',
                'current affair',
                'quiz questions with answers',
                'quiz with answers'
            ],
            siteUrl: "https://www.nratest.com"
        }
    }

    const metaDescription = description || site.siteMetadata.description
    const image =
        metaImage && metaImage.src
            ? `${site.siteMetadata.siteUrl}${metaImage.src}`
            : null
    const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            link={
                canonical
                    ? [
                        {
                            rel: "canonical",
                            href: canonical,
                        },
                    ]
                    : []
            }
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: "keywords",
                    content: site.siteMetadata.keywords.join(","),
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ]
                .concat(
                    metaImage
                        ? [
                            {
                                property: "og:image",
                                content: image,
                            },
                            {
                                property: "og:image:width",
                                content: metaImage.width,
                            },
                            {
                                property: "og:image:height",
                                content: metaImage.height,
                            },
                            {
                                name: "twitter:card",
                                content: "summary_large_image",
                            },
                        ]
                        : [
                            {
                                name: "twitter:card",
                                content: "summary",
                            },
                        ]
                )
                .concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
}

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
    }),
    pathname: PropTypes.string,
}

export default SEO