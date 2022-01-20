from TikTokApi import TikTokApi
import sys

def main(url, id):
  api = TikTokApi.get_instance()
  videoSchema = api.get_video_by_url(url)
  open(f'{id}.mp4', 'wb').write(videoSchema)
  

main(sys.argv[1], sys.argv[2])