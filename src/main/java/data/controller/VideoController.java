package data.controller;

import data.dto.VideoDto;
import data.service.VideoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/livestream")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @GetMapping("/api/video")
    public String getVideoUrl() {
        VideoDto liveVideoDto = videoService.getLiveVideo();
        return liveVideoDto.getUrl();
    }
}

