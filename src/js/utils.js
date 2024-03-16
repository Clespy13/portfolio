export function slugify(text)
{
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export function formatDate(date)
{
    return new Date(date).toLocaleDateString(undefined);
}

export function formatPosts(posts, {
    filterOutDrafts = true,
    filterOutFutuerPosts = true,
    sortByDate = true,
    limit = undefined,
    } = {})
{
    const filteredPosts = posts.reduce((acc, post) => {
        const {date, draft} = post.frontmatter;
        if (filterOutDrafts && draft) return acc;

        if (filterOutFutuerPosts && new Date(date) > new Date()) return acc;

        acc.push(post)
        return acc;
    }, [])

    if (sortByDate)
    {
        filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    }

    if (typeof limit == "number")
    {
        return filteredPosts.slice(0, limit);
    }

    return filteredPosts;
}