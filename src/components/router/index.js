import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import HomePage from '../pages/homepage'
import ReleasePage from '../pages/release'
import BuyPage from '../pages/buy'
import AboutPage from '../pages/about/AboutPage'
import FAQPage from '../pages/faq'
import TermsPage from '../pages/footerpage/TermsPage'
import PrivacyPage from '../pages/footerpage/PrivacyPage'
import BloodlinePage from '../pages/footerpage/BloodlinePage'
import RosterPage from '../pages/roster'
import StablePage from '../pages/stable/StablePage'
import ActivityPage from '../pages/activity/ActivityPage'
import PresalePage from '../pages/presale/PresalePage'
import WrongNetwork from '../pages/network/WrongNetwork'
import WelcomePage from '../pages/startpages/WelcomePage'
import DedicatedPage from '../pages/dedicate'
import CreateStablePage from '../pages/startpages/CreateStablePage'
import StudPage from '../pages/stud/StudPage'
// import MarketplacePage from '../pages/marketplace/MarketplacePage';
import SelectMatePage from '../pages/stud/SelectMatePage'
import RacingPage from '../pages/racing/RacingPage'
// import SoldoutPage from '../pages/soldout/SoldoutPage';
import MetamaskAuthPage from '../pages/startpages/MetamaskAuthPage'
import MetamaskFailPage from '../pages/startpages/MetamaskFailPage'
import MetamaskLoginPage from '../pages/startpages/MetamaskLoginPage'
import MetamaskInstallPage from '../pages/startpages/MetamaskInstallPage'

const Router = () => (
  <Switch>
    <Route path="/" component={HomePage} exact={true} />
    <Route path="/home" component={HomePage} exact={true} />
    <Route path="/home/:modal" component={HomePage} exact={true} />
    <Route path="/release" component={ReleasePage} exact={true} />
    {/* <Route path='/buy' component={SoldoutPage} exact={true} /> */}
    <Route path="/buy" component={BuyPage} exact={true} />
    <Route path="/buy/:modal" component={BuyPage} exact={true} />
    <Route path="/about" component={AboutPage} exact={true} />
    <Route path="/faq" component={FAQPage} exact={true} />
    <Route path="/terms" component={TermsPage} exact={true} />
    <Route path="/privacy" component={PrivacyPage} exact={true} />
    <Route path="/bloodline" component={BloodlinePage} exact={true} />
    <Route path="/roster" component={RosterPage} exact={true} />
    <Route path="/stable" component={StablePage} exact={true} />
    <Route path="/activity" component={ActivityPage} exact={true} />
    <Route path="/presale" component={PresalePage} exact={true} />
    <Route path="/welcome" component={WelcomePage} exact={true} />
    <Route path="/racehorse/:horseId" component={DedicatedPage} exact={true} />
    <Route path="/create-stable" component={CreateStablePage} exact={true} />
    <Route path="/network" component={WrongNetwork} exact={true} />
    <Route path="/stud" component={StudPage} exact={true} />
    {/* <Route path='/marketplace' component={MarketplacePage} exact={true} /> */}
    <Route path="/:horseId/select-mate" component={SelectMatePage} exact={true} />
    <Route path="/racing" component={RacingPage} exact={true} />
    <Route path="/metamask-auth" component={MetamaskAuthPage} exact={true} />
    <Route path="/metamask-fail" component={MetamaskFailPage} exact={true} />
    <Route path="/metamask-login" component={MetamaskLoginPage} exact={true} />
    <Route path="/metamask-install" component={MetamaskInstallPage} exact={true} />
    <Redirect to="/" />
  </Switch>
)

export default Router
