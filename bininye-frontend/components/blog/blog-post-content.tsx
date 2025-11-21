interface BlogPostContentProps {
  content: string
  author: string
  role: string
}

export function BlogPostContent({ content, author, role }: BlogPostContentProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-lg md:prose-xl prose-stone dark:prose-invert max-w-none">
        {/* Author intro for context */}
        <div className="not-prose flex items-center gap-4 mb-12 p-6 bg-muted/30 rounded-2xl border border-border/50">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shrink-0">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground m-0 text-lg">Un article de {author}</p>
            <p className="text-muted-foreground text-sm m-0">{role}</p>
          </div>
        </div>

        {/* Dynamic content rendering */}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="
            [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-primary [&>h2]:mt-12 [&>h2]:mb-6
            [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-6
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-muted-foreground [&>ul>li]:mb-2
            [&>blockquote]:border-l-4 [&>blockquote]:border-secondary [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-xl [&>blockquote]:text-foreground [&>blockquote]:my-10 [&>blockquote]:bg-secondary/5 [&>blockquote]:p-6 [&>blockquote]:rounded-r-xl
          "
        />

        {/* Conclusion / Call to Action */}
        <div className="not-prose mt-16 p-8 bg-primary text-primary-foreground rounded-2xl text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Cet article vous a inspiré ?</h3>
          <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
            Rejoignez Binin Ye et aidez-nous à transformer ces paroles en actions concrètes sur le terrain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors">
              Faire un don
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
              Devenir bénévole
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
