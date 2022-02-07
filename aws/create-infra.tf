provider "aws" {
    profile = "default"
    region = "us-east-2"
}

resource "aws_instance" "tiktok_downloader" {
    instance_type = "t2.micro"
    tags = {
        Name = "tiktok_downloader"
    }
}