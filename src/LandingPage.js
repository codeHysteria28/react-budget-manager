import React from 'react'
import * as Sentry from "@sentry/react";

const LandingPage = () => {
    return (
        <div>
            landing page
        </div>
    )
}

export default Sentry.withProfiler(LandingPage);
