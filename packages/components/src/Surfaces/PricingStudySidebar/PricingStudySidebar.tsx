import React, { useState } from 'react';

import { Magnet } from '../../Animations/Magnet';
import { Button } from '../Button/Button';
import RightArrowIcon from '../../Icons/RightArrow';

import FooterStyles from '../FooterInternationalContents/index.module.css';
import HeroStyles from '../Hero/index.module.css';
import CaseStudySidebarStyles from '../CaseStudySidebar/index.module.css';
import OpenRolesStyles from '../OpenRolesList/index.module.css';

export const PricingStudySidebar: React.FC<{ onBookNow?: () => void }> = ({ onBookNow }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example data, replace with actual form state
  // const formData = {
  //   selectedRole: { title: 'Developer' },
  //   selectedSkills: { React: true, Node: true },
  //   selectedPeople: { name: '3' },
  //   selectedPriceType: { name: 'Hourly' }
  // };
  const formData = new FormData();

  const handleSendRequest = async () => {
    debugger;
    setLoading(true);
    setError(null);
    setSuccess(false);
    // try {
    //   const res = await fetch('/api/pricing', {
    //     method: 'POST',
    //     body: formData
    //   });
    //   if (res.ok) {
    //     setSuccess(true);
    //   } else {
    //     const data = await res.json();
    //     setError(data.message || 'Failed to send request');
    //   }
    // } catch (err: any) {
    //   setError(err.message || 'Failed to send request');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className={CaseStudySidebarStyles['sidebar']}>
      <div className={HeroStyles['homepage__hero']}>
        <div className={HeroStyles['expertise-heading-container']} data-new-theme="false">
          <div style={{ opacity: 1, transform: 'translateY(0px)' }}>
            <h1 className={HeroStyles['expertise-heading']}>
              <span className="block lg:inline-block">Plans &amp; Pricing</span>
            </h1>
          </div>
        </div>
      </div>

      <div className={`${FooterStyles['footer-columns']} footer-columns`}>
        <div className={`${FooterStyles['footer-columns__column']} ${FooterStyles['footer-columns__column--initial']}`}>
          <div className={FooterStyles['footer-columns__globally']}>
            <h3>Or Contact us with</h3>
          </div>
          <a href="mailto:contact@dev8x.com">contact@dev8x.com</a>
        </div>
      </div>
      <div className={`${FooterStyles['footer-columns']} footer-columns`}>
        <Magnet>
          <Button variant="secondary" context="contact" endIcon={<RightArrowIcon width="14" />} onClick={handleSendRequest} disabled={loading}>
            {loading ? 'Sending...' : 'Send Request'}
          </Button>
        </Magnet>
        {success && (
          <div className={HeroStyles['homepage__hero']} style={{ color: 'green' }}>
            Request sent!
          </div>
        )}
        {error && (
          <div className={FooterStyles['footer-columns__globally']} style={{ color: 'red' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
