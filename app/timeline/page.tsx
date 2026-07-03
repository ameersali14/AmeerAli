import { Metadata } from 'next';
import { getTimelineEvents } from '@/lib/data';
import { TimelineSection } from '@/components/sections/TimelineSection';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AI Timeline',
    description: 'Major milestones in Artificial Intelligence and Healthcare from 2022 onwards.',
  };
}

export default async function TimelinePage() {
  const events = await getTimelineEvents();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-healthcare-50 to-white py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="heading-xl">AI Timeline</h1>
          <p className="text-body-lg mt-4 max-w-2xl mx-auto">
            Key milestones in Artificial Intelligence and its impact on Healthcare
          </p>
        </div>
      </section>

      <TimelineSection events={events} />
    </div>
  );
}