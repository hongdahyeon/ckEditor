package ckEditor.hong.ckEditor.domain.hongPost;


import ckEditor.hong.ckEditor.domain.hongPost.dto.HongPostDTO;
import ckEditor.hong.ckEditor.domain.hongPost.vo.HongPostVO;
import ckEditor.hong.ckEditor.global.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class HongPostRestController {

    private final HongPostService hongPostService;

    @PostMapping("/post")
    public Response join(@RequestBody HongPostDTO dto) {
        Long joinId = hongPostService.join(dto);
        return Response.ok(joinId);
    }

    @DeleteMapping("/post/{id}")
    public Response delete(@PathVariable(name = "id") Long id){
        hongPostService.delete(id);
        return Response.ok("해당 게시글이 삭제되었습니다.");
    }

    @GetMapping("/post")
    public Response list() {
        List<HongPostVO> list = hongPostService.list();
        return Response.ok(list);
    }

    @GetMapping("/post/{id}")
    public Response view(@PathVariable(name = "id") Long id) {
        HongPostVO view = hongPostService.view(id);
        return Response.ok(view);
    }

    @PutMapping("/post/{id}")
    public Response edit(@PathVariable(name = "id") Long id, @RequestBody HongPostDTO dto) {
        hongPostService.edit(id, dto);
        return Response.ok("해당 게시글이 수정되었습니다.");
    }

    @PostMapping(value = "/uploadCKImageFile", produces="application/json")
    public Map<String, Object> uploadCKImageFile(@RequestParam("file") MultipartFile multipartFile){
        return hongPostService.uploadCKImageFile(multipartFile);
    }
}