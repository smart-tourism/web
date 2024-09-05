import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function RateShopperPage() {
  return (
    <ContentLayout title="Rate Shopper">
      <Breadcrumb>
        <BreadcrumbList>
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
          {/* <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/rate-shopper">Rate Shopper</Link>
            </BreadcrumbLink>
          </BreadcrumbItem> */}
          {/* <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>Rate Shopper</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {/* <PlaceholderContent /> */}
    </ContentLayout>
  );
}
