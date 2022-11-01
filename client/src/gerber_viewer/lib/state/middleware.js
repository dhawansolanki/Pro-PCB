// all store middleware
import { createAnalyticsMiddleware } from '../analytics';
import { createLogMiddleware } from '../logger';
import { createRenderMiddleware } from '../render';
import { createSettingsMiddleware } from '../settings';
export default function createMiddleware() {
    return [
        createAnalyticsMiddleware(),
        createRenderMiddleware(),
        createSettingsMiddleware(),
        createLogMiddleware(),
    ];
}
//# sourceMappingURL=middleware.js.map