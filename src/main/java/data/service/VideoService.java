package data.service;

import data.dto.VideoDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VideoService {

    public VideoDto getLiveVideo() {
        VideoDto liveVideoDto = new VideoDto();
        liveVideoDto.setId("1");
        liveVideoDto.setTitle("Live Broadcast");
        liveVideoDto.setUrl("https://fizgyqfmmplm18255632.cdn.ntruss.com/live/video/ls-20230711132113-wpwRE/playlist.m3u8");

        return liveVideoDto;
    }
}

