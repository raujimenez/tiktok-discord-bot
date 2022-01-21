from TikTokApi import TikTokApi
import sys

def main(url, id):
  api = TikTokApi.get_instance()
  videoSchema = api.get_video_by_url(url)
  with open(f'{id}.mp4', 'wb') as f1:
    f1.write(videoSchema)
   

main(sys.argv[1], sys.argv[2])