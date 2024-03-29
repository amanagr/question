// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Frameworks datasource.
 *
 * This module is compatible with core/form-autocomplete.
 *
 * @package    tool_lpmigrate
 * @copyright  2016 Frédéric Massart - FMCorz.net
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/ajax', 'core/notification'], function($, ajax, Notification) {

    return /** @alias module:tool_lpmigrate/frameworks_datasource */ {

        /**
         * List frameworks.
         *
         * @param {Number} contextId The context ID.
         * @param {Object} options Additional parameters to pass to the external function.
         * @return {Promise}
         */
        processResults: function(selector, results) {
            var options = [];
            $.each(results, function(index, data) {
                options.push({
                    value: data.id,
                    label: data.type,
                });
            });
            return options;
        },

        list: function(subject_id, type) {
            var args = {
                    subject_id: subject_id,
                    type: type,
                };
            var promise = ajax.call([{
                methodname: 'block_test_creator_filter_topics',
                args: args,
            }])[0];

            return promise.fail(Notification.exception);
        },

        /**
         * Process the results for auto complete elements.
         *
         * @param {String} selector The selector of the auto complete element.
         * @param {Array} results An array or results.
         * @return {Array} New array of results.
         */

        /**
         * Source of data for Ajax element.
         *
         * @param {String} selector The selector of the auto complete element.
         * @param {String} query The query string.
         * @param {Function} callback A callback function receiving an array of results.
         * @return {Void}
         */
        transport: function(selector, query, callback) {
            if (selector == '#id_topic') {
                var el = $("#id_subject");
                this.list(el.find(":selected").attr('value'), 'topic').then(callback);
            }
            else if(selector == '#id_subtopic') {
                var el = $("#id_topic");
                this.list(el.find(":selected").attr('value'), 'subtopic').then(callback);
            }
            // this.list(contextId, {
            //     query: query,
            //     onlyvisible: onlyVisible,
            // }).then(callback);
        }
    };

});