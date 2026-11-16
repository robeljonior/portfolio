import type { StaticImageData } from "next/image";
import deviceTrackingImage from "@/lib/images/Distributed device tracking.png";
import integrationImage from "@/lib/images/Distributed_system_integration.png";
import goBackendImage from "@/lib/images/Go_backend_services.png";
import qualityImage from "@/lib/images/Qualit_ and_release_confidence.png";
import paymentImage from "@/lib/images/payment_system.png";
import ussdImage from "@/lib/images/ussd.png";

/** Figure for each project page, keyed by slug. Add new images here. */
export const PROJECT_IMAGES: Record<string, StaticImageData> = {
  "payment-transaction-flows": paymentImage,
  "distributed-system-integration": integrationImage,
  "go-backend-services": goBackendImage,
  "quality-release-confidence": qualityImage,
  "ussd-mobile-gateway": ussdImage,
  "realtime-device-tracking": deviceTrackingImage,
};
