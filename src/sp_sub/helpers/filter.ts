/**
 * filter metrics based on name
 * - `includeMetric`: regexp matching those metrics you want in
 * - `excludeMetric`: regexp matching those metrics you want out
 */

import {UPayload} from "sparkplug-payload/lib/sparkplugbpayload";
import {args} from "../args";

const {includeMetric, excludeMetric} = args;

export const filter = (metrics: UPayload["metrics"]) => {
    if ((metrics === null) || (metrics === undefined)) {
        return metrics;
    } else {
        const filteredMetrics = [];
        for (const metric of metrics) {
            if ((metric.name !== null) && (metric.name !== undefined)) {
                if (includeMetric !== undefined) {
                    if (metric.name.match(includeMetric)) {
                        filteredMetrics.push(metric);
                    }
                } else if (excludeMetric !== undefined) {
                    if (!metric.name.match(excludeMetric)) {
                        filteredMetrics.push(metric);
                    }
                } else {
                    filteredMetrics.push(metric);
                }
            }
        }
        return filteredMetrics;
    }
};
