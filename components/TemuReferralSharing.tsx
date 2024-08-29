'use client';

import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";

interface ReferralLink {
  id: string;
  shortenedLink: string;
  originalLink: string;
  user: {
    name: string;
    score: number;
  };
}

interface PendingReferral {
  id: string;
  link: string;
  used: number;
  status: string;
  expiresAt: number;
}

const TemuReferralSharing: React.FC = () => {
  const { data: session, status } = useSession();
  const [referralLink, setReferralLink] = useState('');
  const [postedLinks, setPostedLinks] = useState<ReferralLink[]>([]);
  const [userCredits, setUserCredits] = useState(0);
  const [pendingReferrals, setPendingReferrals] = useState<PendingReferral[]>([]);
  const [ownedReferrals, setOwnedReferrals] = useState<PendingReferral[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ... existing useEffect and fetchUserData ...

  const fetchReferrals = async () => {
    try {
      const res = await fetch('/api/referrals');
      const data = await res.json();
      setPostedLinks(data as ReferralLink[]);
    } catch (error) {
      console.error('Failed to fetch referrals:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralLink }),
      });
      const data = await res.json();
      if (res.ok) {
        setPostedLinks([...postedLinks, data as ReferralLink]);
        setOwnedReferrals([...ownedReferrals, { ...data, status: 'unused', expiresAt: Date.now() } as PendingReferral]);
        setReferralLink('');
        setUserCredits(userCredits - 1);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Failed to post referral link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseLink = async (shortenedLink: string, originalLink: string, id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/referrals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralId: id, action: 'use' }),
      });
      if (res.ok) {
        window.open(shortenedLink, '_blank');
        const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        setPendingReferrals([...pendingReferrals, { link: originalLink, used: Date.now(), id, status: 'pending_user', expiresAt }]);
      } else {
        throw new Error('Failed to use referral link');
      }
    } catch (error) {
      console.error('Error using referral link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPurchase = async (id: string) => {
    // ... existing code ...
  };

  // ... rest of the component ...

  return (
    <div className="container mx-auto p-4">
      {/* ... existing JSX ... */}
      <CardTitle>Welcome, {session?.user?.name}</CardTitle>
      {/* ... rest of the JSX ... */}
      {postedLinks.map((post) => (
        <li key={post.id} className="border p-4 rounded-md flex justify-between items-center">
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-gray-500">Score: {post.user.score}</p>
          </div>
          <Button onClick={() => handleUseLink(post.shortenedLink, post.originalLink, post.id)} disabled={isLoading}>
            Use Link
          </Button>
        </li>
      ))}
      {/* ... rest of the JSX ... */}
      {pendingReferrals.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Pending Purchases to Confirm</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {pendingReferrals.map((ref) => (
                <li key={ref.id} className="border p-4 rounded-md">
                  <p>Used on: {new Date(ref.used).toLocaleString()}</p>
                  <Progress 
                    value={(ref.expiresAt - Date.now()) / (10 * 60 * 1000) * 100} 
                    max={100}
                    className="my-2" 
                  />
                  <Button 
                    onClick={() => handleConfirmPurchase(ref.id)} 
                    disabled={isLoading || ref.status !== 'pending_user' || Date.now() > ref.expiresAt}
                    className="w-full mt-2"
                  >
                    {ref.status === 'pending_user' && Date.now() <= ref.expiresAt ? 'Confirm Purchase' : 'Expired'}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default TemuReferralSharing;