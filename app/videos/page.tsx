import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Play, Video as VideoIcon } from 'lucide-react';
import { getVideos } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Videos',
    description: 'Watch talks, presentations, and educational content on AI healthcare and digital health innovation.',
  };
}

function getYouTubeEmbedUrl(url: string): string | null {
  const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

export default async function VideosPage() {
  const videos = await getVideos();

  // Group videos by category
  const categorizedVideos = videos.reduce(
    (acc, video) => {
      const category = video.Category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(video);
      return acc;
    },
    {} as Record<string, typeof videos>
  );

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-healthcare-50 via-white to-healthcare-100 py-16 md:py-24">
        <div className="container-custom">
          <span className="text-sm font-medium text-healthcare-600 uppercase tracking-wider">
            Multimedia
          </span>
          <h1 className="heading-xl mt-4">Videos</h1>
          <p className="text-body-lg mt-4 max-w-2xl">
            Talks, presentations, interviews, and educational content on AI healthcare
            and digital health innovation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {videos.length === 0 ? (
            <div className="text-center py-16">
              <VideoIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500">No videos found.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(categorizedVideos).map(([category, categoryVideos]) => (
                <div key={category}>
                  <h2 className="font-serif text-2xl font-semibold text-neutral-900 mb-6">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryVideos.map((video) => {
                      const embedUrl = video['Video URL']
                        ? getYouTubeEmbedUrl(video['Video URL'])
                        : null;

                      return (
                        <article
                          key={video.id}
                          className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100"
                        >
                          {embedUrl ? (
                            <div className="relative aspect-video">
                              <iframe
                                src={embedUrl}
                                title={video.Title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                              />
                            </div>
                          ) : video.Thumbnail?.[0]?.url ? (
                            <a
                              href={video['Video URL']}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative aspect-video block group"
                            >
                              <Image
                                src={video.Thumbnail[0].url}
                                alt={video.Title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                  <Play className="w-8 h-8 text-healthcare-600 ml-1" />
                                </div>
                              </div>
                            </a>
                          ) : (
                            <div className="aspect-video bg-neutral-200 flex items-center justify-center">
                              <a
                                href={video['Video URL']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-neutral-100 transition-colors"
                              >
                                <Play className="w-8 h-8 text-healthcare-600 ml-1" />
                              </a>
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {video['Publish Date']
                                  ? new Date(video['Publish Date']).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                    })
                                  : ''}
                              </span>
                            </div>
                            <h3 className="font-serif text-lg font-semibold text-neutral-900">
                              {video.Title}
                            </h3>
                            {video.Description && (
                              <p className="mt-2 text-neutral-600 text-sm line-clamp-2">
                                {video.Description}
                              </p>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
