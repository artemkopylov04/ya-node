import React from 'react';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Divider from '../../components/Divider/Divider';
import './Details.scss';

const log = ` Starting type checking and linting service... 
Using 1 worker with 2048MB memory limit 
Hash: d54ed20309f352b3bda76cbbb6d272ed6afde438bd7a265eb08db3624c32dfc883a8c379c67f4de6 
Version: webpack 4.41.6 
Child 
    Hash: d54ed20309f352b3bda7 
    Time: 40364ms 
    Built at: 2020-02-23 16:04:54 
    Asset Size Chunks Chunk Names 0.bundle.static.css 1
        
        .31 MiB 0 [emitted] vendors~main 0.bundle.static.js 10.3 MiB 0 [emitted]    \
        vendors~main bundle.static.css 48.6 KiB 1 [emitted] main bundle.static.js 613 KiB 1 [emitted] main static/media/Cat.afa2191f.svg 9.83 KiB [emitted] static/media/illustration.a17c1b18.svg 14.8 KiB [emitted] static/media/picture.eef6f3b8.svg 16.2 KiB [emitted] Entrypoint main = 0.bundle.static.css 0.bundle.static.js bundle.static.css bundle.static.js [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built] [./src/account/actions/index.ts] 2.46 KiB {1} [built] [./src/account/api/lib/models/index.ts] 2.17 KiB {1} [built] [./src/account/api/lib/models/mappers.ts] 21 KiB {1} [built] [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {1} [built] [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {1} [built] [./src/account/epics/index.ts] 328 bytes {1} [built] [./src/account/epics/pageData.ts] 834 bytes {1} [built] [./src/account/epics/personalPage.ts] 2.29 KiB {1} [built] [./src/account/epics/registrationForm.ts] 910 bytes {1} [built] [./src/account/index.tsx] 561 bytes {1} [built] [./src/account/reducers/githubRepos.ts] 837 bytes {1} [built] [./src/account/reducers/index.ts] 1.83 KiB {1} [built] [./src/account/reducers/serverError.ts] 526 bytes {1} [built] [./src/account/store.ts] 1.05 KiB {1} [built] + 1864 hidden modules Child Hash: 6cbbb6d272ed6afde438 Time: 32877ms Built at: 2020-02-23 16:04:47 Asset Size Chunks Chunk Names server.js 6.34 MiB main [emitted] main Entrypoint main = server.js [./src/account/actions/index.ts] 2.46 KiB {main} [built] [./src/account/api/lib/models/index.ts] 2.17 KiB {main} [built] [./src/account/api/lib/models/mappers.ts] 21 KiB {main} [built] [./src/account/api/lib/schoolaccountAPI.ts] 4.97 KiB {main} [built] [./src/account/api/lib/schoolaccountAPIContext.ts] 1.73 KiB {main} [built] [./src/account/epics/index.ts] 328 bytes {main} [built] [./src/account/epics/pageData.ts] 834 bytes {main} [built] [./src/account/epics/personalPage.ts] 2.29 KiB {main} [built] [./src/account/epics/registrationForm.ts] 910 bytes {main} [built] [./src/account/mappers/index.ts] 2.18 KiB {main} [built] [./src/account/reducers/githubRepos.ts] 837 bytes {main} [built] [./src/account/reducers/index.ts] 1.83 KiB {main} [built] [./src/account/reducers/serverError.ts] 526 bytes {main} [built] [./src/account/server.tsx] 1.62 KiB {main} [built] [./src/account/store.ts] 1.05 KiB {main} [built] + 1484 hidden modules
`;

function Details(props) {
  return (
    <div className="content">
        <div className="header">
            <div className="header__container">
                <div className="header__title">
                    <Text class="text text_size_xl text_color_repo" content="philip1967/my-awesome-repo" />
                </div>
                <div className="header__buttons">
                    <Button 
                        isIcon
                        isText
                        buttonClasses="button button_primary button_size_s button_size_text-with-icon" 
                        textClasses="text text_size_m text_margin_s text_margin_s_with-icon text_mobile_hidden" 
                        iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_rebuild"
                        content="Rebuild"/>
                    <Button 
                        isIcon
                        buttonClasses="button button_primary button_size_s button_size_icon" 
                        iconClasses="icon icon_size_s icon_margin_s icon_margin_s_with-text icon_margin_s_mobile_full icon_settings"
                        />
                </div>
            </div>
        </div>
        <div className="main">
            <div className="main__container details">
                <div class="card card__extended_true">
                    <div class="card__status">
                        <div class="icon icon_size_l icon_done"></div>
                    </div>
                    <div class="card__info">
                        <div class="card__commit-info">
                            <div class="card__commit-message card__commit-message_extended_true">
                                <Text class="card__ticket card__ticket_done text" content="#1368"/>
                                <Text class="card__message text text_size_l" content="add documentation for postgres scaler"/>
                            </div>
                            <div class="card__commit-about card__commit-about_extended_true">
                                <div class="card__branch-info">
                                    <Icon class="card__branch-icon icon icon_size_m icon_commit"/>
                                    <Text class="card__branch-name text text_size_m" content="master"/>
                                    <Text class="card__branch-hash text text_size_m" content="9c9f0b9"/>
                                </div>
                                <div class="card__commiter">
                                    <Icon class="card__user-icon icon icon_size_m icon_user"/>
                                    <Text class="card__user-name text text_size_m" content="Philip Kirkorov"/>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div class="card__commit-times">
                            <div class="card__commit-date">
                                <div class="card__commit-date-icon icon icon_size_m icon_calendar"></div>
                                <div class="text text_size_m">21 янв, 03:06</div>
                            </div>
                            <div class="card__build-duration">
                                <div class="card__build-duration-icon icon icon_size_m icon_watch"></div>
                                <div class="text text_size_m">1 ч 20 мин</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>   
                    <Text class="log text text_size_m" content={log} />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Details;