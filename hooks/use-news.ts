import { newsService } from "@/services";

export function useLatestNews() {
  return newsService.getLatest();
}