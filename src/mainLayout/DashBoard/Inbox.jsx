import React from 'react';
import CreateCampaign from './CreateCampaign';
import CampaignList from './CampaignList';

const Inbox = () => {
    return (
        <div>
            <CreateCampaign></CreateCampaign>
            <CampaignList></CampaignList>
        </div>
    );
};

export default Inbox;