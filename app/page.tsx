import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import TemuReferralSharing from '@/components/TemuReferralSharing';

const Home: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="container mx-auto p-4">
      <TemuReferralSharing />
    </main>
  );
};

export default Home;