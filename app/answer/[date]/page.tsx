import { permanentRedirect } from 'next/navigation';
import { formatDateToSlug } from '@/lib/utils';

type Props = { params: Promise<{ date: string }> };

export default async function AnswerPage({ params }: Props) {
    const { date } = await params;
    permanentRedirect(`/nyt-pips-answer-for-${formatDateToSlug(date)}`);
}

