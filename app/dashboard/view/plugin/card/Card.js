import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './card.css';

import i18n from '../../../utils/i18n';
import api from '../../../api';
import { notify, NOTIFY_TYPE } from 'components/Notification/actions';

class Card extends Component {
    render() {
        const { id, pluginName, remark, src, createdBy, belong } = this.props;
        const to = {
            pathname: '/dashboard/plugin/developedbyme/management',
            state: { pluginId: id },
        };
        return (
            <div className="plugin-card">
                <div className="top">
                    <a className="name" href="javascript:;" target="_blank" rel="noopener noreferrer">{pluginName}</a>
                    <div className="author">
                        <img src={src} />
                        <span>{createdBy}</span>
                    </div>
                </div>
                <div className="desc">{remark}</div>
                {belong === 1 && (
                    <div className="control">
                        <button className="button" onClick={() => this.handleUninstall(id)}>{i18n('global.uninstall')}</button>
                    </div>
                )}
                {belong === 3 && (
                    <div className="control">
                        <Link className="button" to={to}>{i18n('global.management')}</Link>
                        <button className="button">{i18n('global.workspace')}</button>
                    </div>
                )}
            </div>
        );
    }

    handleUninstall = (pluginId) => {
        const { fetchThirdParty } = this.props;
        // status 为 2 表示禁用
        api.uninstallPlugin({ pluginId, status: 2 }).then(res => {
            if (res.code === 0) {
                fetchThirdParty();
            } else {
                notify({ notifyType: NOTIFY_TYPE.ERROR, message: res.msg });
            }
        }).catch(err => {
            notify({ notifyType: NOTIFY_TYPE.ERROR, message: err });
        });
    }
}

export default Card;