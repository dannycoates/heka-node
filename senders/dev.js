/*
 ***** BEGIN LICENSE BLOCK *****
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The Initial Developer of the Original Code is the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2012
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *  Rob Miller (rmiller@mozilla.com)
 *
 ***** END LICENSE BLOCK *****
 */
var fs = require('fs');
var base = require('./base');

var StdoutSender = function(encoder, hmc) {
    this.stream = process.stdout;
    this.init(encoder, hmc);

    this._send_msg = function(text) {
        this.stream.write(text);
    }
};
base.abstractSender.call(StdoutSender.prototype);

var stdoutSenderFactory = function(config) {
    var config = typeof config !== 'undefined' ? config : {};
    var encoder = config['encoder'];
    var hmc = config['hmc'];
    return new StdoutSender(encoder, hmc);
};


var FileSender = function(filePath, encoder, hmc) {
    this.stream = fs.createWriteStream(filePath);
    this.init(encoder, hmc);

    this._send_msg = function(text) {
        this.stream.write(text);
    }
};
base.abstractSender.call(FileSender.prototype)

var fileSenderFactory = function(sender_config) {
    var filePath = sender_config['filePath'];
    var encoder = sender_config['encoder'];
    var hmc = sender_config['hmc'];

    return new FileSender(filePath, encoder, hmc);
};


var DebugSender = function(encoder, hmc) {
    this.init(encoder, hmc);
    this.msgs = [];
    this._send_msg = function(text) {
        this.msgs.push(text);
    }
};
base.abstractSender.call(DebugSender.prototype);

var debugSenderFactory = function(config) {
    var config = typeof config !== 'undefined' ? config : {};
    var encoder = config['encoder'];
    var hmc = config['hmc'];
    return new DebugSender(encoder, hmc);
};


exports.fileSenderFactory = fileSenderFactory;
exports.stdoutSenderFactory = stdoutSenderFactory;
exports.debugSenderFactory = debugSenderFactory;
