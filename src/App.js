import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route, Redirect } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppRightPanel from './AppRightPanel';

import { Dashboard } from './components/Dashboard';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';
import { ButtonDemo } from './components/ButtonDemo';
import { TableDemo } from './components/TableDemo';
import { ListDemo } from './components/ListDemo';
import { TreeDemo } from './components/TreeDemo';
import { PanelDemo } from './components/PanelDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { OverlayBornIdentity } from './borns/OverlayBornIdentity';
import { OverlayBornTicket } from './borns/OverlayBornTicket';

import { MediaDemo } from './components/MediaDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { FileDemo } from './components/FileDemo';
import { ChartDemo } from './components/ChartDemo';
import { ChartCovid } from './components/ChartCovid';
import { MiscDemo } from './components/MiscDemo';
import { Documentation } from './components/Documentation';
import { IconsDemo } from './utilities/IconsDemo';
import { Widgets } from './utilities/Widgets';
import { GridDemo } from './utilities/GridDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { DisplayDemo } from './utilities/DisplayDemo';
import { FlexBoxDemo } from './utilities/FlexboxDemo';
import { CrudDemo } from './pages/CrudDemo';
import { CalendarDemo } from './pages/CalendarDemo';
import { TimelineDemo } from './pages/TimelineDemo';
import { Invoice } from './pages/Invoice';
import { Help } from './pages/Help';
import { EmptyPage } from './pages/EmptyPage';
import { PdfGenerator } from './pages/PdfGenerator';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';




import PrimeReact from 'primereact/api';
import UnityWeatherApp from './components-unity/UnityWeatherApp';
import Prism from 'prismjs';


import { Login } from './pages/Login';
import ProtectedRoute from './ahthentificate/ProtectedRoute';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = (props) => {

    const [resetActiveIndex, setResetActiveIndex] = useState(null)
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('horizontal');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [colorScheme, setColorScheme] = useState('dark')
    const [topbarScheme, setTopbarScheme] = useState('light')
    const [menuScheme, setMenuScheme] = useState('light')
    const [themeScheme, setThemeScheme] = useState('light')
    const [theme, setTheme] = useState('purple');
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false)

    const menu = [
        {
            label: 'الواجهـــة الرئيسية', icon: 'pi pi-home', to: '/Dashboard'
        },

    ];

    let menuClick;
    let rightPanelClick;
    let configClick;
    let searchClick;
    let topbarUserMenuClick;





    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        }
        else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    useEffect(() => {
        setResetActiveIndex(true)
        setMenuActive(false)
    }, [menuMode])

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setResetActiveIndex(true)
            hideOverlayMenu();
        }
        if (!event.item.items && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }
    };

    const onMenuClick = (event) => {
        if (menuActive && event.target.className === 'layout-menu-container') {
            setResetActiveIndex(true);
            setMenuActive(false)
        }
        menuClick = true;
    }

    const onMenuModeChange = (menuMode) => {
        setMenuMode(menuMode)
        if (menuMode === 'sidebar') {
            if (sidebarStatic) {
                setSidebarActive(true)
            }
        }
        else {
            setSidebarActive(false)
            if (topbarScheme !== menuScheme) {
                setMenuScheme(topbarScheme)
            }
        }
        if (topbarScheme === 'dark') {
            setThemeScheme('dark')
        }
    };

    const onColorSchemeChange = (scheme) => {
        setColorScheme(scheme);
        props.setColorScheme(scheme)
    };

    const onThemeSchemeChange = (scheme) => {
        setThemeScheme(scheme)
        setMenuScheme(scheme)
        setTopbarScheme(scheme)
    };

    const onTopbarSchemeChange = (scheme) => {
        setTopbarScheme(scheme)
    };

    const onMenuSchemeChange = (scheme) => {
        setMenuScheme(scheme)
    };

    const onThemeChange = (themeColor) => {
        setTheme(themeColor)
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setRightPanelActive(false);

        if (isMobile()) {
            setStaticMenuMobileActive(prevStaticMenuMobileActive => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }
        event.preventDefault();
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const hideOverlayMenu = () => {
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const onRightPanelClick = () => {
        rightPanelClick = true;
    };

    const onRightPanelButtonClick = () => {
        setRightPanelActive((prevState) => !prevState)
        rightPanelClick = true;
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive(prevConfigActive => !prevConfigActive);
        configClick = true;
    };

    const onTopbarSearchToggle = () => {
        setSearchActive(prevState => !prevState);
        searchClick = true;
    };

    const onTopbarSearchClick = () => {
        searchClick = true
    };

    const onTopbarUserMenuClick = () => {
        setTopbarUserMenuActive(prevState => !prevState);
        topbarUserMenuClick = true;
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            setSearchActive(false)
            searchClick = false;
        }

        if (!topbarUserMenuClick && topbarUserMenuActive) {
            setTopbarUserMenuActive(false)
            topbarUserMenuClick = false;
        }

        if (!rightPanelClick && rightPanelActive) {
            setRightPanelActive(false);
        }

        if (!configClick && configActive) {
            setConfigActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setResetActiveIndex(true)
                setMenuActive(false)
            }

            if (staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        searchClick = false;
        topbarUserMenuClick = false;
        rightPanelClick = false;
        configClick = false;
        menuClick = false;
    };

    const onSidebarMouseOver = () => {
        setSidebarActive(!isMobile());
    };

    const onSidebarMouseLeave = () => {
        setSidebarActive(false)
    };

    const onToggleMenu = (event) => {
        menuClick = true;
        setSidebarStatic(prevState => !prevState);

        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive(prevMenuActive => !prevMenuActive);
    };

    const layoutClassName = classNames('layout-wrapper', {
        'layout-sidebar': menuMode === 'sidebar',
        'layout-static': menuMode === 'sidebar' && sidebarStatic,
        'layout-horizontal': menuMode === 'horizontal',
        'layout-rightpanel-active': rightPanelActive,
        'layout-slim': menuMode === 'slim',
        'layout-mobile-active': staticMenuMobileActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
    }, 'layout-menu-' + menuScheme + ' layout-topbar-' + topbarScheme);

    const [showStat, setShowStat] = useState(false);
    const [showStatWrongDashboard, setShowStatWrongDashboard] = useState(false);

    console.log(showStat);


    return (
        <div className={layoutClassName} onClick={onDocumentClick}>

            <AppTopbar topbarScheme={topbarScheme} onRightPanelButtonClick={onRightPanelButtonClick}
                searchActive={searchActive} onTopbarSearchToggle={onTopbarSearchToggle} onTopbarSearchClick={onTopbarSearchClick}
                topbarUserMenuActive={topbarUserMenuActive} onTopbarUserMenuClick={onTopbarUserMenuClick}
                menu={menu} menuActive={menuActive} onRootMenuItemClick={onRootMenuItemClick} mobileMenuActive={staticMenuMobileActive}
                onMenuItemClick={onMenuItemClick} menuMode={menuMode}
                sidebarStatic={sidebarStatic} sidebarActive={sidebarActive} onSidebarMouseOver={onSidebarMouseOver} onSidebarMouseLeave={onSidebarMouseLeave}
                onToggleMenu={onToggleMenu} onMenuButtonClick={onMenuButtonClick} resetActiveIndex={resetActiveIndex} onMenuClick={onMenuClick} />

            <AppRightPanel onRightPanelClick={onRightPanelClick} />

            <AppConfig configActive={configActive} onConfigButtonClick={onConfigButtonClick} onConfigClick={onConfigClick}
                menuMode={menuMode} onMenuModeChange={onMenuModeChange}
                ripple={ripple} onRippleChange={onRippleChange}
                inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                colorScheme={colorScheme} onColorSchemeChange={onColorSchemeChange}
                topbarScheme={topbarScheme} onTopbarSchemeChange={onTopbarSchemeChange}
                menuScheme={menuScheme} onMenuSchemeChange={onMenuSchemeChange}
                themeScheme={themeScheme} onThemeSchemeChange={onThemeSchemeChange}
                theme={theme} onThemeChange={onThemeChange} />

            <div className="layout-main">
                <div className="layout-content">

                    {/*<UnityWeatherApp />
                <Route    render={(props) =>   <Redirect push={ true } to="/login" />       }/>
                */}




                    <Route path="/" exact render={() => <Dashboard showStat={showStat}  />} />

                    <Route path="/login" render={() => <Login />} />
                    <Route path="/Dashboard" exact component={Dashboard} />
                    <ProtectedRoute path="/start/documentation" component={Documentation} />
                    <ProtectedRoute path="/uikit/formlayout" component={FormLayoutDemo} />
                    <ProtectedRoute path="/uikit/floatlabel" component={FloatLabelDemo} />
                    <ProtectedRoute path="/uikit/input" component={InputDemo} />
                    <ProtectedRoute path="/uikit/invalidstate" component={InvalidStateDemo} />
                    <ProtectedRoute path="/uikit/button" component={ButtonDemo} />
                    <ProtectedRoute path="/uikit/table" component={TableDemo} />
                    <ProtectedRoute path="/uikit/list" component={ListDemo} />
                    <ProtectedRoute path="/uikit/tree" component={TreeDemo} />
                    <ProtectedRoute path="/uikit/panel" component={PanelDemo} />
                    <Route path="/uikit/overlay" component={OverlayDemo} />
                    <Route path="/uikit/overlaybornidentity" component={OverlayBornIdentity} />
                    <Route path="/uikit/OverlayBornTicket" component={OverlayBornTicket} />
                    <ProtectedRoute path="/uikit/menu" component={MenuDemo} />
                    <ProtectedRoute path="/uikit/message" component={MessagesDemo} />
                    <ProtectedRoute path="/uikit/media" component={MediaDemo} />
                    <ProtectedRoute path="/uikit/file" component={FileDemo} />
                    <ProtectedRoute path="/uikit/chart" component={ChartDemo} />
                    <ProtectedRoute path="/uikit/chartCovid" component={ChartCovid} />
                    <ProtectedRoute path="/uikit/misc" component={MiscDemo} />
                    <ProtectedRoute path="/utilities/display" component={DisplayDemo} />
                    <ProtectedRoute path="/utilities/elevation" component={ElevationDemo} />
                    <ProtectedRoute path="/utilities/flexbox" component={FlexBoxDemo} />
                    <ProtectedRoute path="/utilities/icons" component={IconsDemo} />
                    <ProtectedRoute path="/utilities/widgets" component={Widgets} />
                    <ProtectedRoute path="/utilities/grid" component={GridDemo} />
                    <ProtectedRoute path="/utilities/spacing" component={SpacingDemo} />
                    <ProtectedRoute path="/utilities/typography" component={TypographyDemo} />
                    <ProtectedRoute path="/utilities/text" component={TextDemo} />
                    <Route path="/pages/crud" component={CrudDemo} />
                    <ProtectedRoute path="/pages/calendar" component={CalendarDemo} />
                    <ProtectedRoute path="/pages/help" render={() => <Help colorScheme={colorScheme} />} />
                    <ProtectedRoute path="/pages/invoice" component={Invoice} />
                    <ProtectedRoute path="/pages/empty" component={EmptyPage} />
                    <Route path="/pages/pdfGenerator" component={PdfGenerator} />


                    <ProtectedRoute path="/pages/timeline" component={TimelineDemo} />
                </div>

                <AppFooter  setShowStat={setShowStat}  />


            </div>

            <div className="layout-mask modal-in"></div>
        </div>
    );

}

export default App;
