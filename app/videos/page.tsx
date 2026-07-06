import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Play, Video as VideoIcon } from 'lucide-react';
import { getVideos } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Videos — Talks & Presentations',
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
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <span className="inline-block text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-4">
            Multimedia
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] font-bold text-[#0B1B2B] md:text-[3.5rem]">
            Videos
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-[#64748B] max-w-xl md:text-base">
            Talks, presentations, interviews, and educational content on AI healthcare
            and digital health innovation.
          </p>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {videos.length === 0 ? (
            <div className="text-center py-24">
              <VideoIcon className="w-16 h-16 text-[#E2E8F0] mx-auto mb-4" />
              <p className="text-[15px] text-[#94A3B8]">No videos found.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(categorizedVideos).map(([category, categoryVideos]) => (
                <div key={category}>
                  {/* Category Header */}
                  <h2 className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-[0.2em] mb-8">
                    {category}
                  </h2>
                  
                  {/* Video Grid */}
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {categoryVideos.map((video) => {
                      const embedUrl = video['Video URL']
                        ? getYouTubeEmbedUrl(video['Video URL'])
                        : null;

                      return (
                        <article
                          key={video.id}
                          className="bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#CBD5E1]"
                        >
                          {/* Video Player / Thumbnail */}
                          {embedUrl ? (
                            <div className="relative aspect-video bg-[#0B1B2B]">
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
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute inset-0 bg-[#0B1B2B]/30 flex items-center justify-center group-hover:bg-[#0B1B2B]/40 transition-colors duration-300">
                                <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                  <Play className="w-6 h-6 text-[#0284C7] ml-0.5" />
                                </div>
                              </div>
                            </a>
                          ) : (
                            <a
                              href={video['Video URL']}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="aspect-video bg-[#F1F5F9] flex items-center justify-center group"
                            >
                              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                <Play className="w-6 h-6 text-[#0284C7] ml-0.5" />
                              </div>
                            </a>
                          )}

                          {/* Content */}
                          <div className="p-5 lg:p-6">
                            <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider mb-2.5">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {video['Publish Date']
                                  ? new Date(video['Publish Date']).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                    })
                                  : ''}
                              </span>
                            </div>
                            
                            <h3 className="text-[16px] font-bold text-[#0B1B2B] leading-snug line-clamp-2">
                              {video.Title}
                            </h3>
                            
                            {video.Description && (
                              <p className="mt-2 text-[13px] leading-[1.6] text-[#64748B] line-clamp-2">
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