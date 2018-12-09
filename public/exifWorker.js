onmessage = function (e) {
    function _findEXIFinJPEG(file) {
        var dataView = new DataView(file);
        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
            return false;
        }
        var offset = 2,
            length = file.byteLength,
            marker;
        while (offset < length) {
            if (dataView.getUint8(offset) != 0xFF) {
                return false;
            }
            marker = dataView.getUint8(offset + 1);
            if (marker == 225) {
                return _readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
            } else {
                offset += 2 + dataView.getUint16(offset + 2);
            }
        }
    }
    function _readTags(file, tiffStart, dirStart, bigEnd) {
        var tagsAdresses = {
            0x0112: "Orientation",
            0x0110: "Model"
        };
        var entries = file.getUint16(dirStart, !bigEnd),
            tags = {},
            entryOffset, tag,
            i;
        for (i = 0; i < entries; i++) {
            entryOffset = dirStart + i * 12 + 2;
            tag = tagsAdresses[file.getUint16(entryOffset, !bigEnd)];
            if (tag) {
                tags[tag] = _readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
            }
        }
        return tags;
    }
    function _readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
        var type = file.getUint16(entryOffset + 2, !bigEnd),
            numValues = file.getUint32(entryOffset + 4, !bigEnd),
            valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
            offset,
            vals, n;
        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
                return _getStringFromDB(file, offset, numValues - 1);
            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return file.getUint16(entryOffset + 8, !bigEnd);
                } else {
                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
                    }
                    return vals;
                }
        }
    }
    function _getStringFromDB(buffer, start, length) {
        var outstr = "";
        for (var n = start; n < start + length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
        return outstr;
    }
    function _readEXIFData(file, start) {
        if (_getStringFromDB(file, start, 4) != "Exif") {
            return false;
        }
        var bigEnd,
            tags,
            tiffOffset = start + 6;
        if (file.getUint16(tiffOffset) == 0x4949) {
            bigEnd = false;
        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
            bigEnd = true;
        } else {
            return false;
        }
        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
            return false;
        }
        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
        if (firstIFDOffset < 0x00000008) {
            return false;
        }
        tags = _readTags(file, tiffOffset, tiffOffset + firstIFDOffset, bigEnd);
        return tags;
    }

    function handleBinaryFile(binFile) {
        var data = _findEXIFinJPEG(binFile);
        postMessage(data || {});
    }
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        handleBinaryFile(e.target.result);
    };
    fileReader.readAsArrayBuffer(e.data);
    return true;
}
